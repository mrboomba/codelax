var Promise = require('es6-promise').Promise;
var moment = require('moment');
var _ = require('underscore');
var userModels = require('../app/models/user');
var exerciseModels = require('../app/models/exercise');
var lessonModels = require('../app/models/lesson');
// var Product = require('../models/product');
// var User = require('../models/user');
// var WStorage = require('../models/weeklystorage');

function createDB() {
    return new Promise(function(resolve, reject) {
      console.log(123);
        var exerciseJson = JSON.parse(require('fs').readFileSync(__dirname + '/../testcase/exercise.json', 'utf8'));
        //var lessonJson = JSON.parse(require('fs').readFileSync(__dirname + '/../testcase/lesson.json', 'utf8'));
       // var userJson = JSON.parse(require('fs').readFileSync(__dirname + '/../testcase/user.json', 'utf8'));
        
       // userModels.remove({}, function(error) {
           // if (error) reject(error);
            exerciseModels.remove({}, function(error){
                if (error) reject(error);
               exerciseModels.create(exerciseJson, function(error) {
                   if (error) reject(error);
                        resolve();
                    });
                });
            });
       // });
}

module.exports.createDB = createDB;