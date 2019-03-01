const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const Article = require('../models/article');
const assignmentRouter = express.Router();
assignmentRouter.use(bodyParser.json());



assignmentRouter.route('/article')
.get((req,res,next) => {
    Article.find({ approved_by : { $exists: true } } )
    .populate('author','username')
    .populate('approved_by','username')
    .then((article) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(article);
        console.log(article);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(authenticate.verifyUser,(req, res, next) => {
	req.body.author = req.user._id;
    Article.create(req.body)
    .then((article) => {
        
        article.populate('author');

        article.save()
            .then((articleData) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articleData);
            })
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyEitherAdmin,(req, res, next) => {
    Article.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


assignmentRouter.route('/article/:articleId/approve')
.post(authenticate.verifyEitherAdmin, (req, res, next) => {

    Article.findById(req.params.articleId)
    .then((article) => {
        if(article.approved_by){
            err = new Error('Article already approved');
            err.status = 304;
            return next(err);
        }
        else{
        article.approved_by = req.user._id;
		article.populate('approved_by');
        console.log("approving");
        article.save()
            .then((articleData) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articleData);
        })        
    }}, (err) => next(err))
    .catch((err) => next(err));
});


assignmentRouter.route('/article/:articleId')
.get((req,res,next) => {
    Article.findById(req.params.articleId)
    .populate('author','username')
    .populate('approved_by','username')
    .then((article) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(article);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = assignmentRouter;