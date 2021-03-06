var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = new mongoose.Schema({

    auth: {
        username: {type:String,
                    unique:true},
        password: String,
        token: String
    },
    information: {
        name: {
            firstname: String,
            lastname: String
        },
        challenge:{
            type: Number,
            defualt: 0
        },
        lesson:{
            type: Number,
            defualt: 0
        },
    },
    friend:[{type:Number
            }],
    match:[{rival:Number,
            createdAt: { type: Date , default: Date.now }
        }],
    complete:[{type:Number}]

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
