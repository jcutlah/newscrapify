const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;