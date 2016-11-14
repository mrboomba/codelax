// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '217970568615796', // your App ID
        'clientSecret'  : 'a2a084de8443964c293db0e032242f58', // your App Secret
        'callbackURL'   : 'http://ec2-35-161-11-183.us-west-2.compute.amazonaws.com:/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'tLiadESpmDXfyDM8Y0sbcgDZu',
        'consumerSecret'    : 'hyIlywCVWc9RdEZBZ1tIDDE1v3SbLelWqvx6kSXN282QorZFUr',
        'callbackURL'       : 'http://ec2-35-161-11-183.us-west-2.compute.amazonaws.com:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '506545026994-29hd1lvqlt9uhidisido3b8v04217umm.apps.googleusercontent.com',
        'clientSecret'  : 'm1zZMoM7cs3_wu8RhCeSDJWf',
        'callbackURL'   : 'http://ec2-35-161-11-183.us-west-2.compute.amazonaws.com:8080/auth/google/callback'
    }

};