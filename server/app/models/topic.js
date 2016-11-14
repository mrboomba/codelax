var mongoose = require('mongoose');
var moment = require('moment');
// define the schema for our user model
var topicSchema = new mongoose.Schema({

    name: String,
    comment: [{
        username: String,
        comment: String,
        time: moment()

    }]

});


// create the model for users and expose it to our app

module.exports = mongoose.model('Topic', topicSchema);
