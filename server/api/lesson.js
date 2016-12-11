var Lesson = require('../app/models/lesson');
var fs = require('fs');
var _ = require('underscore');


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
          var question=[];
          var fake=[];
          var ans=[];
          _.each(lesson[0].Data ,function(data){
            question.push(data.question);
            fake.push(data.fake);
            ans.push(data.answer);
          })
          res.status(200).json({
            message: 'success',
            question:question,
            fake:fake,
            ans:ans
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

function getImage(req,res){
  var less = req.params.les;
  var num = req.params.num;
  Lesson.find({No:less},function(err,lesson){
    if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
          if(typeof lesson[0].Data[num].img === 'undefined'){
            res.status(200).json({
              message:"no pic"
            });
          }
          else{
          fs.readFile( __dirname + '/../resource/lesson/'+lesson[0].Data[num].img, function(err, data) {
           if (err) tres.status(500).json({
                message: err
            }); // Fail if the file can't be read.
           res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data); // Send the file data to the browser.
           });
        }
        }
  })
};


module.exports = function(router) {

  router.route('/lesson/:number')
  .get(getLesson)
  router.route('/lesson/video/:number')
  .get(getLessonVideo)
  router.route('/lesson/pic/:les/:num')
  .get(getImage)

  return router;
};