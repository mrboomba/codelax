var Lesson = require('../app/models/lesson');


//get exercise by param number
function getLesson(req,res){
	var number = req.params.number;
	Lesson.find({No:number},function(err,lesson){
		if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
        	res.status(200).json({
            message: 'success',
            lesson:lesson
        });
        }
	})
};

function getLessonVideo(req,res){
  var number = req.params.number;
  Lesson.find({No:number},function(err,lesson){
    if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
          res.status(200).json({
            message: 'success',
            video:lesson[0].video
        });
        }
  })
};


module.exports = function(router) {

  router.route('/lesson/:number')
  .get(getLesson)
  router.route('/lesson/video/:number')
  .get(getLessonVideo)

  return router;
};