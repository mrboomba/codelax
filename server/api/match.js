var Match = require('../app/models/match');
var User = require('../app/models/user');
var _ = require('underscore');


//get exercise by param number
function createMatch(req,res){
    var detail ={user:req.body.username,
                 rival:req.body.rival,
                 userPoint:req.body.point,
                 complete:0
                 };
    User.find({'auth.username': req.body.username},function(err,user){
        user[0].match.push({rival:req.body.rival});
        user[0].save();
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
      match.userAnswer.push(req.body.ans1);
      match.userAnswer.push(req.body.ans2);
      match.userAnswer.push(req.body.ans3);
      match.userAnswer.push(req.body.ans4);
      match.userAnswer.push(req.body.ans5);
      match.save(function(err,matched){
        console.log(match.userAnswer);
        res.status(200).json({
          message:"success",
          match:matched
        });

      });
      
      }
    })
    })
    

};
function endMatch(req,res){
    var user = req.body.username;
      var rival = req.body.rival;
      console.log(user);
      console.log(rival);
      user
      Match.find({user:user,rival:rival,complete:1},function(err,match){
        if(err){
        res.status(500).json({
          message:err
        });
      }
      else{
        User.find({'auth.username':user},function(err,user){
          _.each(user[0].complete,function(rivals){
            if(rivals == rival){
              user[0].complete.splice(_.indexOf(rivals),1);
            user[0].save();
            }
          })
        })
        match[0].complete = 2;
        match[0].save();
        res.status(200).json({
          message:"success",
          match:match[0]
        });
      }
      })
}

function getResults(req,res){
      var user = req.body.username;
      var rival = req.body.rival;

      Match.find({user:user,rival:rival,complete:1},function(err,match){
        if(err){
        res.status(500).json({
          message:err
        });
      }
      else{
        res.status(200).json({
          message:"success",
          userPoint:match[0].userPoint,
          rivalPoint:match[0].rivalPoint,
          challenge:match[0].challenge,
          userAnswer:match[0].userAnswer,
          rivalAnswer:match[0].rivalAnswer
        });
      }
      })

}

function finish(req,res){
      var user = req.body.username;
      var rival = req.body.rival;
      User.find({'auth.username':user},function(err,user){
        _.each(user[0].match,function(rivals){
          console.log(rivals);
          if(rivals.rival==rival){
            user[0].match.splice(_.indexOf(user[0].match,rivals),1);
            user[0].save();
          }
        })
        user[0].complete.push(rival);
        user[0].save();
        console.log(user[0]);
      })

      Match.find({user:user,rival:rival,complete:0},function(err,match){
        if(err){
        res.status(500).json({
          message:err
        });
      }
      else{
        match[0].rivalAnswer.push(req.body.ans1);
        match[0].rivalAnswer.push(req.body.ans2);
        match[0].rivalAnswer.push(req.body.ans3);
        match[0].rivalAnswer.push(req.body.ans4);
        match[0].rivalAnswer.push(req.body.ans5);
        match[0].rivalPoint = req.body.point;
        match[0].complete = 1;
        match[0].save();
        var winner ;
        if(match[0].rivalPoint>match[0].userPoint){
            User.find({'auth.username':match[0].rival},function(err,user){
                if(user[0].information.challenge<9){
                  user[0].information.challenge++;
                  user[0].save();
                }
            })
        }
        else if(match[0].rivalPoint<match[0].userPoint){
          User.find({'auth.username':match[0].user},function(err,user){
                if(user[0].information.challenge<9){
                  user[0].information.challenge++;
                  user[0].save();
                }
            })
        }
        res.status(200).json({
          message:"success",
          match:match[0]
        });
      }
      })

      
}

function isRequest(req,res){
        var id = req.params.username;
        Match.find({rival:id,complete:0},function(err,match){
          if(err){
            res.status(500).json({
          message:err
        });
          }
           if(!match[0]){
              res.status(500).json({
          message:'no match'
        });
            }
          else{
           
          res.status(200).json({
          message:"success",
          username:match[0].user,
          challenge:match[0].challenge
        });

          }
        })
}


module.exports = function(router) {

  router.route('/match/create')
  .post(createMatch)
  router.route('/match/:username')
  .get(isRequest)
  router.route('/match/finish')
  .post(finish)
  router.route('/match/result')
  .post(getResults)
  router.route('/match/end')
  .post(endMatch)
  return router;
};