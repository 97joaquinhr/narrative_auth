const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    route:{
        type: String,
        default: 'signin'
    },
    timestamp: { 
        type : Date, 
        default: Date.now 
    },
    wasSuccessful:{
        type: Boolean,
        required: true
    },
    secondsTaken:{
        type: Number,
        default: -1
    },
    description:{
        type: String,
        default: 'Error'
    }
});

mongoose.model('Experiment',experimentSchema);