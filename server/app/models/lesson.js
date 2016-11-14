var mongoose = require('mongoose');

var lessonSchema = new mongoose.Schema({

    Title: {
        type:String
    },
    No:{
    	type:Number,
    	unique:true
    }
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

module.exports = mongoose.model('Lesson',lessonSchema);