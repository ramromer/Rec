
//#delete borrar luego

const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const {validationResult} = require('express-validator')

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const mainController = {
    list: (req, res) => {
        db.Movie.findAll({
            include: ['genre']
        })
            .then(movies => {
                res.render('home.ejs', {movies})
            })
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id,
            {
                include : ['genre','actors']
            })
            .then(movie => {
                res.render('detail.ejs', {movie});
            });
    },
    add: function (req, res) {
        let promGenres = Genres.findAll();
        let promActors = Actors.findAll();
        
        Promise
        .all([promGenres, promActors])
        .then(([allGenres, allActors]) => {
            return res.render(path.resolve(__dirname, '..', 'views',  'add'), {allGenres,allActors})})
        .catch(error => res.send(error))
    },
    create: function (req,res) {
        let errors = validationResult(req);
        if (errors.isEmpty())
        {
            let actoresNuevos = [];
            let actoresNuevosArray = []

            Movies.create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        ).then(()=> {return res.redirect('/')})            
        .catch(err => res.send(err))}
        else{
            let promGenres = Genres.findAll();
            let promActors = Actors.findAll();
            Promise
            .all([promGenres, promActors])
            .then(([allGenres, allActors]) => {
                return res.render(path.resolve(__dirname, '..', 'views',  'add'), {allGenres,allActors,errors:errors.mapped(),old:req.body})})
            .catch(erro => res.send(erro))
        }

    },
    edit: function(req,res) {
        let movieId = req.params.id;
        let promMovies = Movies.findByPk(movieId,{include: ['genre','actors']});
        let promGenres = Genres.findAll();
        let promActors = Actors.findAll();
        Promise
        .all([promMovies, promGenres, promActors])
        .then(([Movie, allGenres, allActors]) => {
            //Movie.release_date = moment( new Date(Movie.release_date)).toLocaleDateString();
            Movie.release_date = moment(Movie.release_date).locale('es-us').format('YYYY-MM-DD');
            //new Date("Sun Jan 03 1999 21:00:00 GMT-0300 (hora estándar de Argentina)").toLocaleDateString()
            //return res.send(Movie.release_date);
            return res.render(path.resolve(__dirname, '..', 'views',  'edit'), {Movie,allGenres,allActors})})
        .catch(error => res.send(error))
    },
    update: function (req,res) {
        let movieId = req.params.id;
        let errors = validationResult(req);
        console.log('herrorsere')
        console.log(errors)
        if (errors.isEmpty())
        {Movies
        .update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
            })
        .then(()=> {
            return res.redirect('/')})            
        .catch(error => res.send(error))
        console.log('here')}
            else
        {console.log('There')
            let movieId = req.params.id;
            let promMovies = Movies.findByPk(movieId,{include: ['genre','actors']});
            let promGenres = Genres.findAll();
            let promActors = Actors.findAll();
            Promise
            .all([promMovies, promGenres, promActors])
            .then(([Movie, allGenres, allActors]) => {
                //Movie.release_date = moment( new Date(Movie.release_date)).toLocaleDateString();
                Movie.release_date = moment(Movie.release_date).locale('es-us').format('YYYY-MM-DD');
                //new Date("Sun Jan 03 1999 21:00:00 GMT-0300 (hora estándar de Argentina)").toLocaleDateString()
                //return res.send(Movie.release_date);
                return res.render(path.resolve(__dirname, '..', 'views',  'edit'), {Movie,allGenres,allActors,errors:errors.mapped(),old:req.body})})
            .catch(error => res.send(error))
        }
    },
    delete: function (req,res) {
        let movieId = req.params.id;
        Movies
        .findByPk(movieId)
        .then(Movie => {
            return res.render(path.resolve(__dirname, '..', 'views',  'delete'), {Movie})})
        .catch(error => res.send(error))
    },
    destroy: function (req,res) {
        let movieId = req.params.id;
        Movies
        .destroy({where: {id: movieId}, force: true}) 
        // force: true es peligroso pero se usa para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/')})
        .catch(error => res.send(error)) 
    }
}

module.exports = mainController;