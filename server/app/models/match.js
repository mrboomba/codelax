var mongoose = require('mongoose');

var matchSchema = new mongoose.Schema({

    Title: {
        type:String
    },
    video:{type:String},
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
    	fake:{type:String},
        img:{type:String}
    }]

});

module.exports = mongoose.model('Match',matchSchema);