const axios = require("axios");
const cheerio = require("cheerio");
const db = require('../models/index');



module.exports = app => {
    app.get('/api/scrapify/:tag',(req,res) => {
        axios.get('http://blog.hubspot.com/').then(response => {
            const $ = cheerio.load(response.data);
            const list = [];
            const errors = [];
            const tag = req.params.tag;
            console.log(tag);
            console.log('parsing document');
            $('article.blog-card').each(function(i, element) {
                // console.log(element);
                let result = {};
                if (tag.toLowerCase() === $(this).children('.blog-card__content').children('.blog-card__meta').children('.blog-card__blog-link').text().trim().toLowerCase()){
                    console.log(`${tag} article found!`);
                    result.title = $(this).children('.blog-card__content').children("h3").children("a").text();
                    result.link = $(this).children('.blog-card__content').children("h3").children("a").attr("href");
                    result.image = $(this).children('figure').children('a').children('img').attr('src');
                    result.category = tag;
                    list.push(result);
                    console.log(result);
                    db.Article.create(result).then(article => {
                        console.log(article);
                    }).catch(err => {
                        // console.log(typeof err.errmsg);
                        console.log(err.errmsg);
                        errors.push(err.errmsg.indexOf('duplicate key error') > -1 ? errors.push(err.errmsg) : false);
                    })
                } else {
                    console.log(`Not a ${tag} article...`);
                };
            });
            res.send(list.length === 0 ? "No more articles to scrape" : list);
        })
    })
}