var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var panelSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },
    parentPoll: {
        type: Schema.Types.ObjectId,
        ref: 'Poll'
    }
});

var Panel=module.exports = mongoose.model('Panel', panelSchema);