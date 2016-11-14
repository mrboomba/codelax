var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = new mongoose.Schema({

    auth: {
        username: String,
        password: String,
        token: String
    },
    information: {
        name: {
            firstname: String,
            lastname: String
        },
        exercise:{
            type: Number,
            defualt: 0
        },
        lesson:{
            type: Number,
            defualt: 0
        },
        acheivement:[{
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Acheivement'
        }]
    },
    topic: [{type:  mongoose.Schema.Types.ObjectId,ref : 'Topic' }]

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
