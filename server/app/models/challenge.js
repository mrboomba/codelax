var mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema({

    No:{
    	type:Number,
    	unique:true
    },
    question:{
    	type:String
    },
    no:{
    	type:Number
    },
    answer:{
    	type:String
    },
    fake:[{type:String}],
    img:{type:String}

});

module.exports = mongoose.model('Exercise',exerciseSchema);

