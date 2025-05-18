import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/User.js";
// import passport from 'passport'

const configurePassport = (passport) => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    return done(null, false, { message: 'No subscriber found' });
                }

                const isValid = await user.comparePassword(password);
                if (!isValid) {
                    return done(null, false, { message: 'Incorrect password' });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        },
    
    ));

    passport.use(passport.serializeUser((user, done) => {
        done(null, user.id); // or user._id depending on your DB
        console.log(user.id)
        }),
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id); // or your user model
            done(null, user);
            console.log("serialized", user)
        } catch (err) {
            done(err);
        }
    }))

}

export {configurePassport}