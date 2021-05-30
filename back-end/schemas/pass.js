var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	id: String,
	password: String
});