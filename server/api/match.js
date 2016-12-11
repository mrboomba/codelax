var Match = require('../app/models/match');
var _ = require('underscore');


//get exercise by param number
function createMatch(req,res){
    var detail ={user:req.body.username,
                 rival:req.body.rival,
                 };
      
    console.log(detail);
    Match.create(detail,function(err,match){
      if(err){
        res.status(500).json({
          message:err
        });
      }
      else{
        match.challenge.push(req.body.num1);
      match.challenge.push(req.body.num2);
      match.challenge.push(req.body.num3);
      match.challenge.push(req.body.num4);
      match.challenge.push(req.body.num5);
        res.status(200).json({
          message:"success",
          match:match
        });
      }
    })

};


module.exports = function(router) {

  router.route('/match/create')
  .post(createMatch)

  return router;
};