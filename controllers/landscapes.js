const Landscape = require('../models/landscapes');

function landscapesIndex(req, res, next) {
  Landscape
  .find()
  .then((landscapes)=> res.render('landscapes/index', {landscapes}))
  .catch(next);
}
//NEW landscape
function landscapesNew(req, res) {
  res.render('landscapes/new');
}
//show profile
function landscapesShow(req, res, next) {
  Landscape
  .findById(req.params.id)
  // populate the field with the actual users data
  // .populate('createdBy comments.user')
  .then((Landscape) => {
    if(!landscape) return res.status(404).render('statics/404');
    res.render('landscapes/show', { landscape });
  })
  .catch(next);
}
//create a landscape
function landscapesCreate(req, res) {
    Landscape
      .create(req.body)
      .then(() => {
        res.redirect('/index');
      });
  }
//edit landscapes pages
function landscapesEdit(req, res) {
    Landscape
    .findById(req.params.id)
    .exec()
    .then(profile => {
    res.render('profiles/edit', { profile });
  })
  .catch(err => {
    res.status(500).end(err);
  });
}
//UPDATE LANDSCAPE
function landscapesUpdate(req, res, next) {
  Landscape
  .findById(req.params.id)
  .then((landscape) => {
    if(!landscape) return res.status(404).render('statics/404');
//what is this below?
    for(const field in req.body) {
      profile[field] = req.body[field];
    }

    return profile.save();
  })
  .then((profile) => res.redirect(`/profiles/${profile.id}`))
  .catch(next);
}
//DELETE A LANDSCAPE
function profilesDelete(req, res, next) {
  Landscape
  .findById(req.params.id)
  .then((landscape) => {
    if(!landscape) return res.status(404).render('statics/404');
    return profile.remove();
  })
  .then(() => res.redirect('/index'))
  .catch(next);
}

module.exports = {
  index:  landscapesIndex,
  new:    landscapesNew,
  create: landscapesCreate,
  show:   landscapesShow,
  edit:   landscapesEdit,
  update: landscapesUpdate,
  delete: landscapesDelete
}

// //LANDSCAPE CONTROLLERS
// // INDEX
// router.route('/index')
//   .get(landscapes.index);
// // NEW
// router.route('/new')
//   .get(landscapes.new);
// // SHOW landscapes
// router.route('/landscapes/:id')
//   .get(landscapes.new);
// // CREATE
// router.route('/landscapes')
//   .post(users.post);
// // EDIT
// router.route('/landscapes/:id/edit')
//   .get(landscapes.edit);
// // UPDATE
// router.route('/landscapes/:id')
//   .put(landscapes.update);
// // DELETE
// router.route('/landscapes/:id')
//   .delete(landscapes.delete);
