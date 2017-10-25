const Landscape = require('../models/landscapes');

//INDEX LANDSCAPE
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
  .then((landscape) => {
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
// //edit landscapes pages
function landscapesEdit(req, res) {
    Landscape
    .findById(req.params.id)
    .exec()
    .then(landscape => {
    res.render('landscapes/edit', { landscape });
  })
  .catch(err => {
    res.status(500).end(err);
  });
}
//UPDATE LANDSCAPE
function landscapesUpdate(req, res) {
  Landscape
  .findById(req.params.id)
  .then((landscape) => {
    if(!landscape) return res.status(404).render('statics/404');
//what is this below?
    for(const field in req.body) {
      landscape[field] = req.body[field];
    }
    return landscape.save();
  })
  .then((landscape) => res.redirect(`/landscapes/${landscape.id}`))
  .catch(err => {
    res.status(500).end(err);
  })
}
//DELETE A LANDSCAPE
function landscapesDelete(req, res, next) {
  Landscape
  .findById(req.params.id)
  .then((landscape) => {
    if(!landscape) return res.status(404).render('problem 404');
    return landscape.remove();
  })
  //the landing page after the operation
  .then(() => res.redirect('/index'))
  .catch(next);
}

module.exports = {
  index:  landscapesIndex,
  new:    landscapesNew,
  show:   landscapesShow,
  create: landscapesCreate,
  edit:   landscapesEdit,
  update: landscapesUpdate,
  delete: landscapesDelete
}
