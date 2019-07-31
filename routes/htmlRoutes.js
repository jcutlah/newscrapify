const app = require('express');

module.exports = function(app){
    app.get('/',function(req,res){
        res.render('index',{title: "Newsify", list: ["one","two","three"]});
    });
};