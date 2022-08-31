// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const admin = require('../middleware/admin');

router.get('/', mainController.list);
router.get('/detail/:id', mainController.detail);
router.get('/add', admin, mainController.add);
router.post('/create', admin, mainController.create);
router.get('/edit/:id', admin, mainController.edit);
router.put('/update/:id', admin, mainController.update);
router.get('/delete/:id', admin, mainController.delete);
router.delete('/delete/:id', admin, mainController.destroy);

module.exports = router;