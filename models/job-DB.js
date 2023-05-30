let mongoose = require('mongoose');

let jobSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	// address: String,
	// image: String,
	// package: Number,
	// cgpa: Number,
	deadline: {
		type: String,
		default: Date.now
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	type: {
		type: String,
		default: 'fulltime'
	},
	appliedUsers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	],
	// questions: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: 'question'
	// 	}
	// ],

	// name: {
	// 	type: String,
	// 	default: 'blank job'
	// },

	image: {
		type: String,
		filename: String
	},

	status: {
		type: String,
		default: 'Active'
	},

	cgpa: {
		type: String,
		default: 'not given'
	},

	description: {
		type: String,
		required: true
	},

	responsibilities: {
		type: String,
		default: 'not given'
	},

	requirements: {
		type: String,
		default: 'not given'
	},

	address: {
		type: String,
		default: 'unknown'
	},

	// time: {
	// 	type: String,
	// 	default: 'Full-Time'
	// },

	// deadline: {
	// 	type: Date
	// },

	category: {
		type: String,
		default: 'Software Engineer'
	},

	experience: {
		type: String,
		default: 'Entry Level'
	},

	companySize: {
		type: String,
		default: 'unknown'
	},

	companyPhone: {
		type: String,
		default: 'unknown'
	},

	companyEmail: {
		type: String,
		default: 'unknown'
	},

	companyWebsite: {
		type: String,
		default: 'unknown'
	},
	aboutCompany: {
		type: String,
		default: ''
	},

	package: {
		type: String,
		default: 'unknown'
	},

	// createdAt: {
	// 	type: Date,
	// 	default: Date.now
	// },

	// students: [
	// 	{
	// 		id: {
	// 			type: mongoose.Schema.Types.ObjectID,
	// 			ref: 'User'
	// 		},
	// 		shortlisted: {
	// 			type: Boolean,
	// 			default: false
	// 		},
	// 		rejected: {
	// 			type: Boolean,
	// 			default: false
	// 		},
	// 		name: String
	// 	}
	// ],

	questions: [
		{
			type: mongoose.Schema.Types.ObjectID,
			ref: 'Question'
		}
	]

});

let Job = mongoose.model('job', jobSchema);
module.exports = Job;
