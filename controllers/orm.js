const db = require('../models/index');


const orm = {
    // get all burgers
    allArticles: function(callback){
        console.log('running allArticles()');
        db.Article.find().sort({_id:-1}).exec((err, results) => {
            if (err) throw err;
            console.log(results);
            callback(results);
        });
    },
    makeFavorite: function(id, callback){
        console.log('running makeFavorite()');
        db.Article.update({_id: id}, {isFavorite:true},(err, result) => {
            console.log(result);
            callback(result);
        });
    },
    getFavorites: function(callback){
        console.log('running getFavorites()');
        db.Article.find({isFavorite:true},(err,results) => {
            console.log(results);
            callback(results);
        });
    },
    addNote: function(message,callback){
        console.log('running addNote()');
        db.Note.create({comment:message.message.message}).then(function(result){
            return db.Article.findOneAndUpdate({ _id: message.id }, {$push:{ notes: result._id }});

        }).then(function(result){
            callback(result);
        }).catch(err => {
            callback(err);
        });
    }
}

module.exports = orm;