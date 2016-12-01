var mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema({

    Title: {
        type:String
    },
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
    	fake:[{type:String}],
        img:{type:String},
        Type:{enum:['fill','choice','compile']}
    }],

});

module.exports = mongoose.model('Exercise',exerciseSchema);

