//container for creating new user module
const User = require('../models/user');

//rendering the reg form for new users
function registrationNew(req, res) {
  res.render('registrations/new');
}

//function for new user
function registrationCreate(req, res){
  //creating new user logic
  User
    .create(req.body)
    .then((user) => {
      req.redirect('/');
    })
    .catch((err) => {
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
