var mongoose = require('mongoose');

var matchSchema = new mongoose.Schema({

    user:Number,
    rival:Number,
    challenge:[Number],
    userAnswer:[String],
    rivalAnswer:[String],
    userPoint:{type:Number,defualt:0},
    rivalPoint:{type:Number,defualt:0}

});

module.exports = mongoose.model('Match',matchSchema);