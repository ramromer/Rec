function guest(req, res, next) {
	if (req.session.userLogged) {
		return res.redirect('/');
	}else{
		next();
	}
}
module.exports = guest;

