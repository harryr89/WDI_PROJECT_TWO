const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//datastructure object
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, unique: true },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});
//A virtual property is one that is accessible in the pre hooks, but will not be stored in the database. passwordConfirmation is something that we want to check, but not keep in the database, so it makes sense to use a virtual here:
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });
//Create a pre-validate hook: If a user has modified their password, and it doesn't match the passwordConfirmation supplied, we invalidate and throw an error.
  userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation!== this.password) this.invalidate('passwordConfirmation', 'Does not match');
  next();
});
//In order to let a user log in, we need to compare the inputted password in the field and compare it with the one that is in the database: We want to create another bit of middleware
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
