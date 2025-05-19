import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import ConnectMongoDBSession from 'connect-mongodb-session'
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import resolvers from './resolvers.js';
import { connectDB } from './db.js';
import authRouter from './routes.js';
import passport from 'passport'

const app = express();


// Connect to Database
connectDB(process.env.MONGO_URI);

// Create executable Schema for GraphQL server
const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' })
const schema = buildSchema(typeDefs);

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

// Middleware to intercept authenticated user 
app.use((req, res, next) => {
    if (req.session.user) {
        console.log(req.session.user)
        // console.log(req.isAuthenticated())
    // next();

    }
    console.log("No authenticated user")
    next();
})

// Middleware to enable GraphQL Introspection and Client Queries
app.use('/graphql',  graphqlHTTP((req) => ({
    schema,
    rootValue: resolvers,
    context: {
      isAuthenticated: req.isAuthenticated(),
      user: req.user  // this is set by Passport after login
    },
    graphiql: true
}))
)

app.use((err, req, res, next) => {
    console.error("Something went wrong", err);
    next(err)
})

app.get('/*', (req, res) => {
    const indexFile = path.resolve(buildPath, 'index.html')
    // res.sendFile(indexFile)
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
     return res.status(500).send('Error loading client-side application.')
    }
    res.send(data) // Serve the full React SPA
  })
})

const PORT = 3301;

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})