import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { graphqlHTTP } from 'express-graphql';
import ConnectMongoDBSession from 'connect-mongodb-session'
import { buildSchema } from 'graphql';
// import { graphqlHTTP } from 'express-graphql';
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers.js';
import { connectDB } from './db.js';
import authRouter from './routes.js';
import passport from 'passport'
import cookie from  'cookie'
import { useServer } from 'graphql-ws/use/ws'
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { loadFilesSync } from '@graphql-tools/load-files'
import { fileURLToPath } from 'url'
import { authenticatedUser } from './routes.js';
import signature from 'cookie-signature';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const typeDefs = loadFilesSync(path.join(__dirname, './schema.graphql'))


const app = express();


// Connect to Database
connectDB(process.env.MONGO_URI);

// Create executable Schema for GraphQL server
// const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' })
// const schema = buildSchema(typeDefs);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers, // Must be an object mapping types & fields
});
// const schema = makeExecutableSchema({ typeDefs, resolvers })

// Implementing a MongoDB middleware session and store for session/login authentication
const MongoDBStore = ConnectMongoDBSession(session)
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 24 * 7
} // Sessions expire after 1 week}
);

if (store) {
  // console.log(store)
  store.on('error', (err) => { console.error(err) })
}

//Cors setup
let corsSetup = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    method: ["GET", "POST"]
}

// Setup Session configurations
const sessionOptions = {
  name: "auth_session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,           // don’t use true unless HTTPS
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
  store: store
}

const buildPath = path.resolve(import.meta.dirname, './build')
console.log(buildPath)

// // const schema = makeExecutableSchema({ typeDefs, resolvers });
// Middleware for cors
app.use(express.static('build'))
app.use(cors(corsSetup));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(session(sessionOptions))

// Initialize passport
app.use(passport.initialize())
app.use(passport.session())

// Mount home and authenticated routes on the authRouter
app.use('/', authRouter);
// configurePassport(passport)

var me = null;
var meAuthenticated = null;

app.use((req, res, next) => {
  me = req.session.user
  meAuthenticated = req.session.authenticated
  console.log("ME", me)
  console.log("AUTHENTICATED", meAuthenticated && meAuthenticated.toString())
  next()
})

// Middleware to enable GraphQL Introspection and Client Queries
app.use('/graphql', graphqlHTTP((req) => ({
    schema,
    // rootValue: resolvers, //No need for this since our schema is built with makeExecutableSchema and not buildSchema
    context: {
      isAuthenticated: req.isAuthenticated(),
      user: req.user ?? req.session.user // this is set by Passport after login
    },
    graphiql: {
      subscriptionEndpoint: 'ws://localhost:3301/graphql',
    },
}))
)

app.use((err, req, res, next) => {
    console.error("Something went wrong", err);
    next(err)
})

app.get('/*', (req, res) => {
    const indexFile = path.resolve(buildPath, 'index.html')
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
     return res.status(500).send('Error loading client-side application.')
    }
    res.send(data) // Serve the full React SPA
  })
})

const PORT = process.env.PORT || 3301

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
})

async function getSessionFromWsRequest(request) {
  const cookies = cookie.parse(request.headers.cookie || '');
  const rawSessionId = cookies['auth_session'];
  if (!rawSessionId) return null;

  const unsignedSessionId = signature.unsign(rawSessionId.slice(2), process.env.SESSION_SECRET);
  if (!unsignedSessionId) return null;

  return new Promise((resolve) => {
    store.get(unsignedSessionId, (err, session) => {
      if (err || !session) return resolve(null);
      resolve(session);
    });
  });
}


async function deserializeUser(userId) {
  try {
    const user = await User.findById(userId).lean(); // use .lean() for performance if needed
    return user;
  } catch (err) {
    console.error('Error deserializing user:', err);
    return null;
  }
}


useServer(
  {
    schema,
    context: async (ctx) => {
      const session = await getSessionFromWsRequest(ctx.extra.request);
      const userId = session?.passport?.user;
    
      if (!userId) {
        return { isAuthenticated: false, user: null };
      }
    
      const user = await deserializeUser(userId); // Convert ID to full user object
    
      return {
        isAuthenticated: !!user,
        user,
      };
    }
  },
  wsServer
);

httpServer.listen(PORT, () => {
  console.log('Server is running on http://localhost:3301');
});

// app.listen(PORT, () => {
//     console.log(`Server is listening at PORT ${PORT}`)
// })