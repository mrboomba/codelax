var Promise = require('es6-promise').Promise;
var moment = require('moment');
var _ = require('underscore');
var userModels = require('../app/models/user');
var challengeModels = require('../app/models/challenge');
var lessonModels = require('../app/models/lesson');
// var Product = require('../models/product');
// var User = require('../models/user');
// var WStorage = require('../models/weeklystorage');

function createDB() {
    return new Promise(function(resolve, reject) {
      
        var challengeJson = JSON.parse(require('fs').readFileSync(__dirname + '/../testcase/challenge.json', 'utf8'));
        var lessonJson = JSON.parse(require('fs').readFileSync(__dirname + '/../testcase/lesson.json', 'utf8'));
        var userJson = JSON.parse(require('fs').readFileSync(__dirname + '/../testcase/user.json', 'utf8'));
        console.log(123);
       userModels.remove({}, function(error) {
            if (error) reject(error);
           challengeModels.remove({},function(error){
              if(error) reject(error);
            lessonModels.remove({}, function(error){

                if (error) reject(error);
              challengeModels.create(challengeJson, function(error){
                if (error) reject(error);
               lessonModels.create(lessonJson, function(error) {
                   if (error) reject(error);
                   userModels.create(userJson,function(err){
                      if(err)  reject(err);         
                        resolve();
                    });
                  });
                });
              });
            });
         });
      });
}

module.exports.createDB = createDB;