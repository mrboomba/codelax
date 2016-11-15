var User = require('../app/models/user');

function getAllExercisePass(req,res){
	User.find({},function(err,users){
		if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
        	res.status(200).json({
            message: 'success',
            number:users.information.exercise,
            user:users.auth.username
        });
        }
	})
}

function getUserExercise(req,res){
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
            exercise:user.information.exercise
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
            lesson:user.information.lesson,
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
            user:user
        });
        }
	})
}

function updateLesson(req,res){
	var number = req.body.number;
	var id = req.body.username;

	User.find({'auth.username':id},function(err,user){
		if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
        	if(user.information.lesson<number)
        	{
        		user.information.lesson = number;
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


function updateExercise(req,res){
	var number = req.body.number;
	var id = req.body.username;

	User.find({'auth.username':id},function(err,user){
		if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
        	if(user.information.exercise<number)
        	{
        		user.information.exercise = number;
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

module.exports = function(router) {

  router.route('/user/:username')
  .get(getUser)
  router.route('/user/:username/lesson')
  .get(getUserLesson)
  router.route('/user/:username/exercise')
  .get(getUserExercise)
  router.route('/user/allexercise')
  .get(getAllExercisePass)
  router.route('/user/updatelesson')
  .post(updateLesson)
  router.route('/user/updateexercise')
  .post(updateExercise)
  return router;
};