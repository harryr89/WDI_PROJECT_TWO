//container for creating new user module
const User = require('../models/user');

//rendering the reg form for new users
function registrationNew(req, res) {
  res.render('registrations/new');
}

//function for new user
function registrationCreate(req, res){
  console.log('registrations create hit!');
  //creating new user logic
  console.log(req.body);
  User
    .create(req.body)
    .then((user) => {
      console.log(user);
      req.session.userId = user.id;
      res.locals.user = user;
      res.locals.isAuthenticated = true;
      res.redirect('/index');
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        return res.status(400).render('registrations/new', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });
}

//export it to a different file
module.exports = {
  new: registrationNew,
  create: registrationCreate
};
