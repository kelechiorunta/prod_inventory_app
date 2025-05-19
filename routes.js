import express from 'express';
import { signupController, loginController } from './controllers.js';
import passport from 'passport';
import User from './models/User.js';
import { configurePassport } from './passport.js';
import { loginSession } from './middleware.js';
import { isAuthenticatedUser } from './controllers.js';

const authRouter = express.Router();

configurePassport(passport);

authRouter.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

authRouter.post('/signup', signupController);
authRouter.post('/signin',  passport.authenticate('local'), (req, res, next) => {
    // next();
    // res.redirect('/')
    req.session.user = req.user
    res.json({ message: 'Login successful', user: req.user, isValid: req.isAuthenticated() });

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

// authRouter.post('/login', loginController);

export default authRouter