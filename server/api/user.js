var User = require('../app/models/user');
var Match = require('../app/models/match');
var _= require('underscore');

function login(req,res){
    var username = req.body.username;
    var password = req.body.password;
    User.find({'auth.username':username},function(err,user){
        if (err) {
            res.status(500).json({
                message: err
            });
        }
        if(!user[0])
               res.status(500).json({
                message: err
            });
        else{
            if(user[0].auth.password===password){
                res.status(200).json({
            message: 'success',
            username:user[0].auth.username
            });
            }
            else
                res.status(500).json({
                message: err
            });
            
        } 
    })
}


function getUserChallenge(req,res){
	var id = req.params.username;
	User.find({'auth.username': id},function(err,user){
		if (err) {
            res.status(500).json({
                message: err
            });
        }
        if(!user[0]){
            res.status(500).json({
                message: "no user"
            });
        }
        else{
        	res.status(200).json({
            message: 'success',
            challenge:user[0].information.challenge,
            name:user[0].information.name.firstname
        });
        }
	})
}

function getUser(req,res){
    var id = req.params.username;
    User.find({'auth.username': id},function(err,user){
        if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
            res.status(200).json({
            message: 'success',
            name:user[0].information.name.firstname,
            lastname:user[0].information.name.lastname
        });
        }
    })
}
function getFriend(req,res){
    var id = req.body.username;
    

}

function getFriendsAndMatchs(req,res){
    var id = req.params.username;
    User.find({'auth.username': id},function(err,user){
        if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
            var rival =[]

            _.each(user[0].match,function(tmp){
                var one_day=1000*60*60*24;

            // Convert both dates to milliseconds
            var now = new Date();
            console.log(now);
            var date2_ms = now.getTime();
            var date1_ms = tmp.createdAt.getTime();

            // Calculate the difference in milliseconds
            var difference_ms = date2_ms - date1_ms;
             //take out milliseconds
            var days = Math.floor(difference_ms/one_day);
            console.log(days);
                if(days>=2){
                _.without(user[0].match, tmp);
                user[0].save();
                Match.remove({user:id,rival:tmp.rival},function(err,match){
                })
            }
                else
                rival.push(tmp.rival);
            });
            res.status(200).json({
            message: 'success',
            friend:user[0].friend,
            match:rival,
            complete:user[0].complete
        });
        }
    })
}

function getUserLesson(req,res){
	var id = req.params.username;
	User.find({'auth.username': id},function(err,user){
		if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
        	res.status(200).json({
            message: 'success',
            lesson:user[0].information.lesson,
        });
        }
	})
}

function random(req,res){
    User.find({},function(err,user){
        
        if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
            res.status(200).json({
            message: 'success',
            user:user[Math.floor((Math.random() * 20) + 1)].auth.username,
        });
    }
});


}


function updateLesson(req,res){
	var number = req.params.number;
	var id = req.params.username;

	User.find({'auth.username':id},function(err,user){
		if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
        	if(user[0].information.lesson<number)
        	{
        		user[0].information.lesson = number;
        		user[0].save(function(err){
        			if(err){
        				res.status(500).json({
        					message:"save error"
        				});
        			}
        		});
        	}
        	res.status(200).json({
            message: 'success',
        });
        }
	})
}


function updateChallenge(req,res){
	var number = req.body.number;
	var id = req.body.username;

	User.find({'auth.username':id},function(err,user){
		if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
        	if(user.information.challenge<number)
        	{
        		user.information.challenge = number;
        		user.save(function(err){
        			if(err){
        				res.status(500).json({
        					message:"save error"
        				});
        			}
        		});
        	}
        	res.status(200).json({
            message: 'success',
        });
        }
	})
}

function addFriend(req,res){
    var friend = req.body.user;
    var user = req.params.number;
    User.find({'auth.username':user},function(err,usr){
        if(err){
            res.status(500).json({
                            message:err
                        });
        }
        else{
            if(!_.contains(usr[0].friend,friend)){
            usr[0].friend.push(friend);
            usr[0].save();
            res.status(200).json({
            message: 'success',
            user:usr[0]
        });
        }
        else
res.status(500).json({
                            message:"save error"
                        });
        }
    })
}

module.exports = function(router) {

  router.route('/user/:username')
  .get(getUser)
  router.route('/user/:username/friandmat')
  .get(getFriendsAndMatchs)
  router.route('/user/:username/lesson')
  .get(getUserLesson)
  router.route('/user/:username/challenge')
  .get(getUserChallenge)
  router.route('/user/updatelesson/:username/:number')
  .get(updateLesson)
  router.route('/user/updateChallenge')
  .post(updateChallenge)
  router.route('/login')
  .post(login)
  router.route('/user/:number/addfriend')
  .post(addFriend)
  router.route('/user/random')
  .get(random)
  return router;
};