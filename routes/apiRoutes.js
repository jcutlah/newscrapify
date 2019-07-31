const axios = require("axios");
const cheerio = require("cheerio");
const db = require('../models/index');

module.exports = app => {
    app.get('/api/scrapify',(req,res) => {
        axios.get('http://www.echojs.com/').then(response => {
            const $ = cheerio.load(response.data);
            const list = [];
            $('article h2').each(function(i, element) {
                let result = {};
                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");
                list.push(result);
                db.Article.create(result).then(article => {
                    console.log(article);
                })
            });
            // console.log($);

            res.send(list);
        })
    })
}