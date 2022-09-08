function adminDue(req, res, next) {
	if (req.session.userLogged) {
		next();
	}else{
		return res.redirect('/');
	}
}
module.exports = adminDue;