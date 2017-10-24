const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');
const errorHandler = require('./lib/errorHandler');
//require my user
const User = require('./models/user');

const app = express();
const { port, dbUri, sessionSecret } = require('./config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbUri, { useMongoClient: true });

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(customResponses);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//creating a cookie
app.use(session({
  secret: process.env.SESSION_SECRET || 'shh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));

// Add some middleware to check if there is an id inside req.session. (1) If there is an id value, use it to find the User with that id and add it to the locals object, meaning the data is accessible in ANY ejs files; (2)if there is not an id inside req.session, call next();
// app.use((req, res, next) => {
//   if (!req.session.userId) return next();
//   User
//     .findById(req.session.userId)
//     .exec()
//     .then(user=> {
//       req.session.userId = user._id;
//       res.locals.user = user;
//       res.locals.isLoggedIn = true;
//
//       next();
//     });
// });

//We need to add a case to the middleware if we cannot find the user:
// app.use((req, res, next) => {
//   if (!req.session.userId) return next();
//
//   User
//     .findById(req.session.userId)
//     .exec()
//     .then(user=> {
//       if (!user) {
//         return req.session.regenerate(() => {
//           res.redirect('/');
//         });
//       }
//       req.session.userId = user._id;
//       res.locals.user = user;
//       res.locals.isLoggedIn = true;
//
//       next();
//     });
// });
app.use(errorHandler);
app.use(authentication);
app.use(routes);


app.listen(port, () => console.log(`Express is listening on port ${port}`));
