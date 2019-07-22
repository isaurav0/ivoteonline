var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//User Schema
var pollSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    body: {
        type: String,
    },
    expireAt: {
        type: Date,
    }
    comment: {
        type: String
    },
    candidates: [CandidateSchema]
}, {timestamps: true});

module.exports = mongoose.model('Poll', pollSchema);


var CandidateSchema = new Schema ({
    title: {
        type: String,
    },
    votedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})