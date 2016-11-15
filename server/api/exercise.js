var Exercise = require('../app/models/exercise');

function getExercise(req,res){
	var number = req.params.number;

	Exercise.find({No:number},function(err,exercise){
		if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
        	res.status(200).json({
            message: 'success',
            exercise:exercise
        });
        }
	})

};

module.exports = function(router) {

  router.route('/exercise/:number')
  .get(getExercise)

  return router;
};