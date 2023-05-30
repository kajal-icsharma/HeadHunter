let mongoose = require('mongoose');

let notifSchema = new mongoose.Schema({
	body: String,
	author: String,
	image: String
});

let Notification = mongoose.model('notification', notifSchema);
module.exports = Notification;
