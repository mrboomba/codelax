var mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({

    No:{
    	type:Number,
    	unique:true
    },
    question:{
    	type:String
    },
    answer:{
    	type:String
    },
    fake:[{type:String}],
    img:{type:String}

});

module.exports = mongoose.model('Challenge',challengeSchema);

