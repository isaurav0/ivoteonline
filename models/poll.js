var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var candidateSchema = require('./candidate')

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
    comment: {
        type: String
    },
    authorID: {
        type: String
    },
    public: {
        type: Boolean
    }
    // candidates: [candidateSchema.schema]
}, {timestamps: true});

var Poll=module.exports = mongoose.model('Poll', pollSchema);



// module.exports.createPoll = function(newPoll, callback){
//             newPoll.save(callback);
//         });
//     });
// };