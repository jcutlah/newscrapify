require("dotenv").config();
const express = require('express');
const db = require('./models');
const exphbs = require('express-handlebars');
const path = require('path');
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost/newscrapify";
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.collections['articles'].drop( function(err) {
    console.log('collection dropped');
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/htmlRoutes.js')(app);
require('./routes/apiRoutes.js')(app);



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});