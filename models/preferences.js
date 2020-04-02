var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    id: String,
    CIN: Number,
    FirstName: String,
    LastName: String,
    PhoneNumber: String,
    Email: String
});

module.exports = mongoose.model('Client', ClientSchema);
