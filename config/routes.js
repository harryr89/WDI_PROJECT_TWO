const express         = require('express');
const router          = express.Router();
const registration    = require('../controllers/registration');
const session         = require('../controllers/session');
const landscapes      = require('../controllers/landscapes');

// A home route
router.get('/', (req, res) => {
  if (!req.session.userId) {
    res.redirect('/login')
  } else {
    res.redirect('/index');
  }
});

//registering a new user
router.route('/register')
  .get(registration.new)
  .post(registration.create);

//add routes for login
router.route('/login')
  .get(session.new)
  .post(session.create);
//routes for logging out
router.route('/logout')
  .get(session.delete);
//landscape pics
router.route('/index')
  .get(landscapes.index)
  .post(landscapes.create);

router.route('/new')
  .get(landscapes.new);

router.route('/landscapes/:id/edit')
  .get(landscapes.edit);
// // EDIT
router.route('/landscapes/:id')
  .get(landscapes.show)
  .put(landscapes.update)
  .delete(landscapes.delete);


module.exports = router;
