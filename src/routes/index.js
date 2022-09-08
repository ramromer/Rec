const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const admin = require('../middleware/admin');
const {check} = require('express-validator');


const validateMovie = [
  check('title').notEmpty().withMessage('Debe ingresar un nombre.'),
  check('title').isLength({min:2}).withMessage('Mínimo de dos caracteres.'),
  check('rating').notEmpty().withMessage('Rating: debe ingresar un numero.'),
  check('rating').isFloat({min:0.0,max:10}).withMessage('Rating: debe ser un numero entre 1 y 10.'),
  check('awards').notEmpty().withMessage('Awards: debe ingresar un numero.'),
  check('awards').isInt({min:0,max:10}).withMessage('Awards: debe ser un numero entre 1 y 10.'),
  check('release_date').notEmpty().withMessage('Debes ingresar la fecha de lanzamiento.'),
  check('release_date').isDate().withMessage('Debes ingresar una fecha válida.'),
  check('length').notEmpty().withMessage('Debes ingresar la duración'),
  check('length').isInt({min:60,max:180}).withMessage('La duración debe ser entre 60 y 180 minutos.'),
]
router.get('/', mainController.list);
router.get('/detail/:id', mainController.detail);
router.get('/add', admin, mainController.add);
router.post('/create', admin, validateMovie, mainController.create);
router.get('/edit/:id', admin, mainController.edit);
router.put('/update/:id', admin, validateMovie, mainController.update);
router.get('/delete/:id', admin, mainController.delete);
router.delete('/delete/:id', admin, mainController.destroy);

module.exports = router;