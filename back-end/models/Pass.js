var mongoose = require('mongoose');
var passSchema = require('../schemas/pass');

module.exports = mongoose.model('Pass', passSchema);