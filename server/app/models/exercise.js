var mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema({

    Title: {
        type:String
    },
    Type:{enum:['fill','choice','compile']},
    No:{
    	type:Number,
    	unique:true
    },
    Data: [{
    	question:{
    		type:String
    	},
    	no:{
    		type:Number
    	},
    	answer:{
    		type:String
    	},
    	fake:[{type:String}]
    }],

});

module.exports = mongoose.model('Exercise',exerciseSchema);