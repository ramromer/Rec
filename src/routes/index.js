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

router.get('/', mainController.list);
router.get('/detail/:id', mainController.detail);
router.get('/add', mainController.add);
router.post('/create', mainController.create);
router.get('/edit/:id', mainController.edit);
router.put('/update/:id', mainController.update);
router.get('/delete/:id', mainController.delete);
router.delete('/delete/:id', mainController.destroy);

module.exports = router;