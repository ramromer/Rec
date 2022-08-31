const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");

let usersController = {
  register: (req, res) => {
    res.render("./register.ejs");
  },
  registerWrite: (req, res) => {
    let errores = validationResult(req);

    if (errores.errors.length > 0) {
      res.render("./register.ejs", {
        errores: errores.mapped(),
        oldData: req.body,
      });
    } else {
      let key = bcryptjs.hashSync(req.body.password, 5);
      let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: key,
        remember_token: req.body.remember,
        rol: req.body.userType,
      };

      db.User.create(newUser)
        .then(() => {
          return res.redirect(`./login/`);
        })
        .catch((error) => res.send(error));
    }
  },
  login: (req, res) => {
  
    return res.render("./login.ejs");
  },
  loginProcess: (req, res) => {
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        let isOkThePassword = bcryptjs.compareSync(req.body.password, user.password);
        if (isOkThePassword) {
          delete user.password;
          req.session.userLogged = user;
          
          
          if (req.body.recordarLogin == true) {
            res.cookie("user", req.body.email, { maxAge: 1000 * 60 * 60 }); 
          }
          res.redirect("/users/profile");
        } else {
          return res.render("./login.ejs", {
            errors: {
              email: {
                msg: "Las credenciales son inválidas",
              },
            },
          });
        }
      } else {
        res
          .render("./login.ejs", {
            errors: {
              email: {
                msg: "La combinación de usuario y contraseña son invalidos o inexistente",
              },
            },
          })
      }
    });
  },
  profile: (req, res) => {
    db.User.findOne({
      where: {
        email: req.session.userLogged.email,
      },
    })
      .then((user) => {
        return res.render("./profile", { user: user.dataValues });
      })
      .catch((err) => console.log(" error al consultar la base de datos", err));
  },
  edit: function (req, res) {
    db.User.findByPk(req.params.id).then(function (Us) {
      if (Us != undefined) {
        res.render("./userEdit.ejs", { Us: Us });
      } else {
        res.redirect("./register.ejs");
      }
    });
  },
  update: function (req, res) {
    let queryUserUpdate = {};
    if (req.body.password ) {
      queryUserUpdate.password = bcryptjs.hashSync(req.body.password, 5);
    }
    if (Object.keys(queryUserUpdate).length > 0) {

      db.User.update(queryUserUpdate, {
        where: {
          id: req.params.id,
        },
      })
        .then((result) => {
          res.redirect("/");
        })
        .catch((err) => console.log(err));
    } else {
      res.redirect("/");
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("user");
    res.redirect("/");
  },
  eliminarUsuario: async (req, res) => {
    db.User.destroy({ where: { id: req.params.id } }).catch((err) => {
      console.log(err);
    });
    res.redirect("/");
  },
  image: (req, res) => {
    let options = {
      root: __dirname + "../../../public/users/avatars/",
    };
    return res.sendFile(req.params.file, options, function (err) {
      if (err) {
        res.send(err);
      }
    });
  },
  askRegister: (req, res) => {
    db.User.findOne({
      where: {
        email: req.params.email,
      },
    })
      .then((user) => {
        if (user !== null) {
          res.send(JSON.stringify(1));
        } else {
          res.send(JSON.stringify(0));
        }
      })
      .catch((err) => console.log(err));
  },
  notFound: (req, res) => {
    res.render("notFound");
  },
};

module.exports = usersController;