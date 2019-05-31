var mongoose = require('mongoose');  
var userSchema = new mongoose.Schema({
  ime: String,
  email: String,
  sifra: String
});
mongoose.model('user', userSchema);