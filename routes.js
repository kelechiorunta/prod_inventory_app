import express from 'express';
import { signupController, loginController } from './controllers.js';
import passport from 'passport';
import User from './models/User.js';
import { configureGooglePassport, configureLocalPassport } from './passport.js';
import { loginSession } from './middleware.js';
import { isAuthenticatedUser } from './controllers.js';

const authRouter = express.Router();

configureLocalPassport(passport);

configureGooglePassport(passport)

authRouter.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/oauth2/redirect/google', passport.authenticate('google'), (req, res, next) => {
  try {
        req.session.user = req.user
    req.session.authenticated = req.isAuthenticated()
    // res.json({ message: 'Login successful', user: req.user, isValid: req.isAuthenticated() });
        res.redirect('/');
    } catch (err) {
        res.redirect('/login')
    }
})

authRouter.post('/signup', signupController);
authRouter.post('/signin',  passport.authenticate('local'), (req, res, next) => {
    // next();
    // res.redirect('/')
    try {
      req.session.user = req.user
      req.session.authenticated = req.isAuthenticated()
      res.json({ message: 'Login successful', user: req.user, isValid: req.isAuthenticated() });
      // res.redirect('/');
  } catch (err) {
      res.redirect('/login')
  }
    

});

authRouter.post("/paystack/webhook", express.json(), (req, res) => {
  const { event, data } = req.body;

  if (event === "charge.success") {
    const reference = data.reference;
    const email = data.customer.email;
    console.log(`Payment successful for ${email}, ref: ${reference}`);
    // You can update DB status here
  }

  res.sendStatus(200);
});


authRouter.get('/isAuthenticated', loginSession, isAuthenticatedUser)

export var authenticatedUser = {}

// authRouter.post('/login', loginController);
authRouter.use((req, res, next) => {
  console.log("USER AUTHENTICATED", req.session.user)
  console.log("USER ISAUTHENTICATED", req.session.authenticated)
  authenticatedUser.user = req.session.user
  authenticatedUser.isActive = req.session.authenticated
  next()
})


export default authRouter