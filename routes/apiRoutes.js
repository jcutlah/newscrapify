const axios = require("axios");
const cheerio = require("cheerio");
const db = require('../models/index');
const orm = require('../controllers/orm');



module.exports = app => {
    app.get('/api/scrapify/:tag',(req,res) => {
        axios.get('http://blog.hubspot.com/').then(response => {
            const $ = cheerio.load(response.data);
            const list = [];
            const errors = [];
            const tag = req.params.tag;
            console.log(tag);
            console.log('parsing document');
            const posts = $('article.blog-card');
            console.log(posts.length);
            let counter = posts.length;
            posts.each(function(i, element) {
                // console.log(element);
                let result = {};
                if (tag.toLowerCase() === $(this).children('.blog-card__content').children('.blog-card__meta').children('.blog-card__blog-link').text().trim().toLowerCase()){
                    console.log(`${tag} article found!`);
                    result.title = $(this).children('.blog-card__content').children("h3").children("a").text();
                    result.link = $(this).children('.blog-card__content').children("h3").children("a").attr("href");
                    result.image = $(this).children('figure').children('a').children('img').attr('src');
                    result.category = tag;
                    
                    console.log(result);
                    db.Article.create(result).then(article => {
                        console.log(list);
                        list.push(article);
                        console.log(list);
                        console.log("'logging article'");
                        // console.log(article);
                        counter --;
                        console.log(counter);
                        if (counter === 0){
                            console.log('end of count. sending to page');
                            res.send(list.length === 0 ? "No more articles to scrape" : list);
                        }
                    }).catch(err => {
                        console.log("'error'");
                        console.log(err.errmsg);
                        errors.push(err.errmsg.indexOf('duplicate key error') > -1 ? errors.push(err.errmsg) : false);
                        counter --;
                        console.log(counter);
                        if (counter === 0){
                            console.log('end of count. sending to page');
                            res.send(list.length === 0 ? "No more articles to scrape" : list);
                        }
                    })
                } else {
                    console.log(`Not a ${tag} article...`);
                    counter --;
                };
            });
            // console.log(list);
            // console.log('sending to page');
        })
    });
    app.get('/api/favorites', (req,res) => {
        orm.getFavorites(function(favorites){
            console.log(favorites);
            res.send(favorites);
        })
    });
    app.put('/api/favorite/:id',(req,res) => {
        const id = req.params.id;
        orm.makeFavorite(id,function(article){
            console.log(article);
            res.send(article);
        })
    });
    app.post('/api/comments/:id',(req,res) => {
        console.log(`"Comment received with body: ${req.body.message}"`);
        const id = req.params.id;
        orm.addNote({id:id,message:req.body},function(response){
            console.log(response);
            res.send(response);
        })
    });
    app.get('/api/comments/:id',(req,res) => {
        console.log('Request received for post comments');
        const id = req.params.id;
        console.log(`Post id = ${id}`);
        orm.getPost(id,function(response){
            console.log(`Response from /api/comments/:id -> ${JSON.stringify(response)}`);
            res.send(response);
        })
    })
}