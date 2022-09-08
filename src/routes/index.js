const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const admin = require('../middleware/admin');


const {body} = require('express-validator');
const validateNewMovie = [
  body('title').notEmpty().withMessage('Debe ingresar un nombre.'),
  body('title').isLength({min:2}).withMessage('Mínimo de dos caracteres.'),
  body('rating').notEmpty().withMessage('Rating: debe ingresar un numero.'),
  body('rating').isInt({min:1,max:10}).withMessage('Rating: debe ser un numero entre 1 y 10.'),
  body('awards').notEmpty().withMessage('Awards: debe ingresar un numero.'),
  body('awards').isInt({min:1,max:10}).withMessage('Awards: debe ser un numero entre 1 y 10.'),
  body('release_date').notEmpty().withMessage('Debes ingresar la fecha de lanzamiento.'),
  body('release_date').isDate().withMessage('Debe ser una fecha válida.'),
  body('length').notEmpty().withMessage('Debes ingresar la duración'),
  body('length').isInt({min:60,max:180}).withMessage('La duración debe ser entre 60 y 180 minutos.'),
]
router.get('/', mainController.list);
router.get('/detail/:id', mainController.detail);
router.get('/add', admin, mainController.add);
router.post('/create', admin, validateNewMovie, mainController.create);
router.get('/edit/:id', admin, mainController.edit);
router.put('/update/:id', admin, mainController.update);
router.get('/delete/:id', admin, mainController.delete);
router.delete('/delete/:id', admin, mainController.destroy);

module.exports = router;