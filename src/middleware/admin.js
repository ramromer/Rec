function admin(req, res, next) {
	if (req.session.userLogged) {
		if (req.session.userLogged.rol==1) {
			next();
		};
	}else{
		return res.redirect('/users/login');
	}
}
module.exports = admin;

