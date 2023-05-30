let express = require('express');
let router = express.Router();
let User = require('../models/user-DB');
let Notification = require('../models/notif-DB');
let { isLoggedIn, isAdmin } = require('../middlewares/index');
// show
router.get('/users/:id', async (req, res) => {
	try {
		let user = await User.findById(req.params.id);
		res.render('show-user', { user });
	} catch (error) {
		console.log('problem while fetching user', error);
	}
});
// edit
router.get('/users/:id/edit', isLoggedIn, async (req, res) => {
	try {
		let user = await User.findById(req.params.id);
		res.render('edit-user', { user });
	} catch (error) {
		console.log('problem while fetching user', error);
	}
});
// update
router.patch('/users/:id', isLoggedIn, async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body.user);
		res.redirect(`/users/${req.params.id}`);
		
		let newNotif = new Notification({
			body: 'User has been Updated Successfully',
			author: updatedUser.name,
			image: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
		});
		await newNotif.save();
		res.redirect(`/users/${req.params.id}`);
	} catch (error) {
		console.log('problem while updating user', error);
	}
});
// delete
router.delete('/users/:id', isLoggedIn, isAdmin, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.redirect(`/users/${req.params.id}`);
	} catch (error) {
		console.log('problem while deleting user', error);
	}
});
module.exports = router;
