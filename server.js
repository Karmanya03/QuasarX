const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User schema
const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
});

const User = mongoose.model('User', userSchema);

// Passport setup
passport.use(new GoogleStrategy({
  clientID: 'your-google-client-id',
  clientSecret: 'your-google-client-secret',
  callbackURL: 'http://localhost:3000/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }, (err, user) => {
    if (err) return done(err);
    if (!user) {
      const newUser = new User({
        googleId: profile.id,
        displayName: profile.displayName,
      });
      newUser.save((err) => {
        if (err) return done(err);
        return done(null, newUser);
      });
    } else {
      return done(null, user);
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Express setup
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Home</h1><a href="/auth/google">Login with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h1>Welcome ${req.user.displayName}</h1><a href="/logout">Logout</a>`);
  } else {
    res.redirect('/');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





//=============================================


