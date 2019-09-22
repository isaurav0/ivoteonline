var mongoose = require('mongoose');
const Schema = mongoose.Schema;


var candidateSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    votedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    }],
    parentPoll: {
        type: Schema.Types.ObjectId,
        ref: 'Poll'
    },
    parentPanel: {
        type: Schema.Types.ObjectId,
        ref: 'Panel'
    }
});

var Candidate = module.exports = mongoose.model('Candidate', candidateSchema)
