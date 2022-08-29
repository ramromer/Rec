const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/movies', mainController.list);
router.get('/movies/new', mainController.new);
router.get('/movies/recommended', mainController.recomended);
router.get('/movies/detail/:id', mainController.detail);
router.get('/movies/add', mainController.add);
router.post('/movies/create', mainController.create);
router.get('/movies/edit/:id', mainController.edit);
router.put('/movies/update/:id', mainController.update);
router.get('/movies/delete/:id', mainController.delete);
router.delete('/movies/delete/:id', mainController.destroy);

module.exports = router;