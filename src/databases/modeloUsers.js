const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
  foto: String,
  links: [String],
  apps: [String]
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  perfil1: userProfileSchema
});

const UserModel = mongoose.model('Usuario', userSchema);

module.exports = UserModel;
