const express         = require('express');
const router          = express.Router();
const registration    = require('../controllers/registration');
const session         = require('../controllers/session');
const landscapes         = require('../controllers/landscapes');

// A home route
router.get('/', (req, res) => res.render('homepage'));

//registering a new user
router.route('/register')
  .get(registration.new)
  .post(registration.create);

//add routes for login
  router.route('/login')
  .get(session.new)
  .post(session.create);

// RESTful routes
// All URLS should contain the PLURAL... don't chose octopus or people or something silly.

//USER CONTROLLERS
//SHOW USERS
// router.route('/users/:id')
//   .get(users.show)

//LANDSCAPE CONTROLLERS
// INDEX
router.route('/index')
  .get(landscapes.index);
// NEW
router.route('/new')
  .get(landscapes.new);
// SHOW landscapes
router.route('/landscapes/:id')
  .get(landscapes.new);
// CREATE
router.route('/landscapes')
  .post(users.post);
// EDIT
router.route('/landscapes/:id/edit')
  .get(landscapes.edit);
// UPDATE
router.route('/landscapes/:id')
  .put(landscapes.update);
// DELETE
router.route('/landscapes/:id')
  .delete(landscapes.delete);

module.exports = router;
