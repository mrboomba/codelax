var mongoose = require('mongoose');

var acheivementSchema = new mongoose.Schema({

    title:{type:String},
    image:{type:String}

});

module.exports = mongoose.model('Acheivement', acheivementSchema);