const db = require('../models/index');


const orm = {
    // get all burgers
    allArticles: function(callback){
        console.log('running allArticles()');
        db.Article.find({}, (err, results) => {
            if (err) throw err;
            console.log(results);
            callback(results);
        });
    }
}

module.exports = orm;