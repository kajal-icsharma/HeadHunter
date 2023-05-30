// authentication
const isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		console.log('you are not logged in');
		res.redirect('/login');
	}
};
// authorization
const isAdmin = function(req, res, next) {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		return res.render('error', { 
			message1 : 'You Do not have permissions to do that',
			message2: 'Only Admin can do that'
		 });
	}
};
module.exports = {
	isLoggedIn,
	isAdmin
};
