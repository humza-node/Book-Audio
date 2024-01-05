const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const audioSchema = new Schema({
    title:
    {
        type: String,
        required: true
    },
    audio:
    {
        type: String,
        required: true
    },
    bookId:
    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    }
});
module.exports=mongoose.model("Audio", audioSchema);