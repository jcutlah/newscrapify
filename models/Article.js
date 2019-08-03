const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: "Uncategorized"
  },
  image: {
      type: String,
      required: true,
      default: "./images/Hubspot.jpg"
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }], 
  isFavorite: {
      type: Schema.Types.Boolean,
      required: true,
      default: false
  }
});
// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
