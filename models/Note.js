const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    comment: String
});
const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;