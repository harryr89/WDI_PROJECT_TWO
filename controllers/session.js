//require the database
const User = require('../models/user');
//add sessionNew function
function sessionNew(req, res) {
  res.render('sessions/new');
}
//What the function does: Take the email that the user inputted in the form and find that user in the database, then check if the user exists or if the password matches with the one in the database and if either the email or the password don't match, display error message.
function sessionCreate(req, res) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        res.status(401).render('sessions/new', { message: 'Unrecognised credentials' });
      }
      //activity log for a current userId
      req.session.userId = user.id;
      res.locals.user = user;
      res.locals.isAuthenticated = true;

      return res.redirect('/index');
    });
}
//when user clicks logout
function sessionDelete(req, res) {
  return req.session.regenerate(() => res.redirect('/'));
}
//Finally, module.exports it
module.exports = {
  new: sessionNew,
  create: sessionCreate,
  delete: sessionDelete
};
