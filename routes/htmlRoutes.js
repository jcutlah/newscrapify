const app = require('express');
const db = require('../models/index');

module.exports = function(app){
    app.get('/',function(req,res){
        db.Article.find({}, (err, results) => {
            if (err) throw err;
            console.log(results);
            res.render('index',{title: "Newsify", results});
        });
    });
};