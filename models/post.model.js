const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, minlength: 5 },
        text: { type: String, required: true, minlength: 5 },
        author: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);