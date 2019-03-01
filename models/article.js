const mongoose = require('mongoose');
validators = require('mongoose-validators');
const Schema = mongoose.Schema; 


const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength : 5
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength : 10
    },
    feature_image: {
        type: String,
        required: true,
        validate: validators.isURL()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approved_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});
var Article = mongoose.model('Article', articleSchema);

module.exports = Article;


