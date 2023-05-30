let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	course: {
		type: String,
		required: true
	  },
	branch: {
		type: String,
		required: true
	  },
	
	cgpa: {
		type: Number,
		required: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	personal_email: {
		type: String,
		sparse: true
	  },
	
	mobile_number: {
		type: Number,
		sparse: true
	},
	selected: {
		type: Boolean,
		default: false
	},
	resume_link: {
		type: String,
		sparse: true
	  },
	
	  documents_link: {
		type: String,
		sparse: true
	  },
	  last_login_date: {
		type: Date,
		default: Date.now
	  },
	
	  avatar: {
		type:String, 
		default: "/images/user_default.png"
	  },
	
	  appliedJobs: [
			{
				type: mongoose.Schema.Types.ObjectID,
				ref: "Job"
			}
		]
});
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
let User = mongoose.model('user', userSchema);
module.exports = User;
