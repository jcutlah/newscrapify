const app = require('express');
const db = require('../models/index');
const orm = require('../controllers/orm');

module.exports = function(app){
    app.get('/',function(req,res){
        orm.allArticles(function(articles){
            console.log(articles);
            res.render('index',{title: "Newsify", articles});
        });
    });
};