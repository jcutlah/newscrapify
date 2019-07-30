require("dotenv").config();
const express = require('express');
const db = require('./models');
const exphbs = require('express-handlebars');
const path = require('path');
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const PORT = 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost/newscrapify";
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes.js')(app);

// Connect to the Mongo DB
mongoose.connect(mongoUri, { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});