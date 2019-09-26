var mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var candidateSchema = require('./candidate')

//User Schema
var pollSchema = new Schema({
    title: {
        type: String, 
        required: true,
        unique: true
    },
    body: {
        type: String,
    },
    expireAt: {
        type: Date,
    },
    startAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    comment: {
        type: String
    },
    authorID: {
        type: String
    }
    ,
    election: {
        type: Boolean
    },
    voterList: [{
        type: String
    }],
    // candidates: [candidateSchema.schema]
}, {timestamps: true});

var Poll=module.exports = mongoose.model('Poll', pollSchema);


// module.exports.createPoll = function(newPoll, callback){
//             newPoll.save(callback);
//         });
//     });
// };