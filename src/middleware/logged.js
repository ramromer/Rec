const db = require('../data/models');

 async function logged(req, res, next) {
    res.locals.isLogged = false;
    let userLogged = false;

    if(req.cookies.user){
        userLogged = req.cookies.user;
    }
    else if(req.session.userLogged){
        userLogged = req.session.userLogged.user
    }
    
    try{
        if(userLogged){
            let user = await db.User.findOne({
                where:{
                    user: userLogged
                }
            });
             
            req.session.userLogged = user;
                
            if ( req.session.userLogged) {
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged.user;
            }
        }
    }    
    catch(err){
        console.log("error logged: ", err);
        res.redirect('/users/login');
    }
    next();
}

module.exports = logged;