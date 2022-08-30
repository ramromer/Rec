let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController.js');
let multer = require('multer');
let path = require('path');
const db = require('../database/models');

const storage = multer.diskStorage({
    destination:  function(req, file, cb) {
        cb(null,'./public/users/avatars');
    },
    filename: function (req,file,cb){
        cb(null,`${Date.now()}_img_${path.extname(file.originalname)}`);
    }
})
const uploadFile = multer({
  storage:storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Solamente los formatos .gif, .png, .jpg and .jpeg estan permitidos!'));
      }
    }    
});
const {body} = require('express-validator');
const validateUserLogin = [
  body('email').notEmpty().withMessage('Por favor ingresa el email con el que te registraste'),
  body('email').isEmail().withMessage('Por favor ingresa un email valido'),
]

const validateUserRegister = [
  body('user').notEmpty().withMessage('Por favor ingrese un nombre de usuario'),
  body('user').custom((value, {req}) => {
    return new Promise((resolve, reject) => {
      db.User.findOne({where:{name:req.body.name}}).then(function(user){
        
        if(Boolean(user)) {
          reject(new Error('El usuario ya estgá siendo usado por otra persona'))
        }
        resolve(true)
      }).catch(err => {console.log(err); reject(new Error('Error en el servidor'))});
    });
  }), 
    body('email').isEmail().withMessage('Por favor ingresa un email valido'),
    body('email').custom((value, {req}) => {
        return new Promise((resolve, reject) => {
          db.User.findOne({where:{email:req.body.email}}).then(function( user){
            
            if(Boolean(user)) {
              reject(new Error('Ese email ya está registrado'))
            }
            resolve(true)
          }).catch(err => {console.log(err); reject(new Error('Error en el servidor'))});
        });
      }), 
    body('remember').notEmpty().withMessage('Por favor pon una palabra o frase para recordar tu password'),
    body('remember').custom((value, {req})=>{
      if (value == req.body.password){
        throw new Error('Esto NO puede ser igual a tu contraseña!');
      }
      return true;
    }),
    body('password').notEmpty().withMessage('Por favor ingrese una contraseña'),
    body('password').isLength({min:8}).withMessage('Tu contraseña debe al menos tener 8 caracteres')
];
const validateUserUpdate = [
  body('password').custom((value, {req})=>{
    if (value.length>0){
      if(value.length < 8){

        throw new Error('Tu contraseña debe al menos tener 8 caracteres');
      }
    }
    return true;
  }),
];

const guest = require('../middleware/guest');
const auth = require('../middleware/auth');

router.get('/login',guest, userController.login);
router.get('/register/:email', userController.askRegister);
router.get('/register',guest, userController.register);
router.get('/edit/:id',auth, userController.edit);
router.get('/profile',auth,userController.profile);
router.get('/logout', userController.logout);
router.post('/login', validateUserLogin, userController.loginProcess);
router.post('/register', uploadFile.single('image'), validateUserRegister, userController.registerWrite);
router.put('/update/:id',auth, uploadFile.single('image'), validateUserUpdate, userController.update);
router.get('*', userController.notFound);


module.exports = router;