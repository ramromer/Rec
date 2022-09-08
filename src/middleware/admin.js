function admin(req, res, next) {
	if (req.session.userLogged) {
		if (req.session.userLogged.rol==1){
			next();
		}
		else if(req.session.userLogged.rol==0){
			res.send("not Authorized");
		}
	}else{
		return res.redirect('/');
	}
}
module.exports = admin;

