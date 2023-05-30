const Job = require('../models/job-DB.js');
const Notification = require('../models/notif-DB');

exports.showLandingPage = async (req, res) => {
    try {
        const jobs = await Job.find({ status: 'Active' }).sort({ _id: -1 }).limit(5).exec();
        res.render('landing', { recentJobs: jobs });
    } catch (err) {
        console.log(err);
        req.flash('error', 'Something went wrong, Please try again later');
        res.redirect('/');
    }
};


exports.jobIndex = async function(req, res) {
	try {
		if (req.query.search && req.query.search.length > 0) {
			// fuzzy searching
			let regex = new RegExp(req.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
			let foundJobs = await Job.find({ $or: [{ name: regex }, { category: regex }] });
			res.render('index', { foundJobs });
			
		} else {
			// extract all the jobs from db
			let foundJobs = await Job.find({});
			res.render('index', { foundJobs });
		}
	} catch (error) {
		req.flash('error', error.message);
		res.redirect('/jobs');
	}
};

exports.newJobForm = function(req, res) {
	res.render('new');
};

exports.createJob = async function(req, res) {
	try {
		// make a database object / model instance
		let newJob = new Job({
			name: req.body.name,
			address: req.body.address,
			image: req.body.image,
			package: req.body.package,
			cgpa: req.body.cgpa,
			deadline: req.body.deadline,
			type: req.body.type,
			status: req.body.status,
			responsibilities: req.body.responsibilities,
			requirements: req.body.requirements,
			category: req.body.category,
			experience: req.body.experience,
			companySize: req.body.companySize,
			companyPhone: req.body.companyPhone,
			companyEmail: req.body.companyEmail,
			companyWebsite: req.body.companyWebsite,
			description : req.body.description

		});
		await newJob.save();
		//! push a new notificatoin
		let newNotif = new Notification({
			body: 'A new job has been posted',
			author: newJob.name,
			image: newJob.image
		});
		await newNotif.save();
		req.flash('success', 'job successfully posted');
		res.redirect('/jobs');
	} catch (error) {
		console.log('error while adding a new job', error);
	}
};

exports.showJob = async function(req, res) {
	try {
		// fetch the required job by using id
		let id = req.params.id;
		let job = await Job.findById(id).populate('appliedUsers');
		res.render('show', { job });
	} catch (error) {
		req.flash('error', 'wrong job id');
		res.redirect('/jobs');
	}
};

exports.editJobForm = async function(req, res) {
	try {
		// fetch the required job by using id
		let id = req.params.id;
		let job = await Job.findById(id);
		res.render('edit', { job });
	} catch (error) {
		console.log('error while fetching a job for edit form', error);
	}
};

exports.updateJob = async function(req, res) {
	try {
		let id = req.params.id;
		// simple js object
		let updatedJob = {
			name: req.body.name,
			address: req.body.address,
			image: req.body.image,
			package: req.body.package,
			cgpa: req.body.cgpa,
			deadline: req.body.deadline,
			type: req.body.type,
			status: req.body.status,
			responsibilities: req.body.responsibilities,
			requirements: req.body.requirements,
			category: req.body.category,
			experience: req.body.experience,
			companySize: req.body.companySize,
			companyPhone: req.body.companyPhone,
			companyEmail: req.body.companyEmail,
			companyWebsite: req.body.companyWebsite,
			description : req.body.description
		};
		await Job.findByIdAndUpdate(id, updatedJob);
		// findOneAndUpdate
		//! push a new notificatoin
		let newNotif = new Notification({
			body: 'A job has been updated',
			author: updatedJob.name,
			image: updatedJob.image
		});
		await newNotif.save();
		res.redirect(`/jobs/${id}`);
	} catch (error) {
		console.log('error while updating the job', error);
	}
};

exports.deleteJob = async function(req, res) {
	try {
		let id = req.params.id;
		await Job.findByIdAndDelete(id);
		// findOneAndDestroy
		res.redirect('/jobs');
	} catch (error) {
		console.log('error while deleting the job', error);
	}
};

exports.applyJob = async function(req, res) {
	try {
		// cgpa validation
		if (!req.user.cgpa) {
			return res.render('error', { 
				message1 : 'You have not entered your CGPA',
				message2: 'Please Enter Your CGPA and Try Again.'
			 });
		}
		let { jobId } = req.params;
		let job = await Job.findById(jobId);
		// does the user pass required cgpa criteria
		if (req.user.cgpa < job.cgpa) {
			return res.render('error', { 
				message1 : 'Your CGPA is Not Enough',
				message2: 'Better Luck Next Time.'
			 });
		}
		// a user can only apply once for a particular job
		for (let user of job.appliedUsers) {
			if (user._id.equals(req.user._id)) {
				return res.render('error', { 
					message1 : 'You Have Already Applied For This Job.',
					message2: 'Try For Other Opportunities Available out There.'
				 });
			}
		}
		job.appliedUsers.push(req.user);
		await job.save();
		res.redirect(`/jobs/${jobId}`);
	} catch (error) {
		console.log('error while applying in job', error);
	}
};
