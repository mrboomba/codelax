var Challenge = require('../app/models/challenge');
var fs = require('fs');

//get exercise by param number
function getChallenge(req,res){
	var number = req.params.number;

	Challenge.find({No:number},function(err,challenge){
		if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
        	res.status(200).json({
            message: 'success',
            question: challenge[0].question,
            fake:challenge[0].fake,
            answer:challenge[0].answer
        });
        }
	})
};

function getImage(req,res){
  var chal = req.params.number;
  Challenge.find({No:chal},function(err,challenge){
    if (err) {
            res.status(500).json({
                message: err
            });
        }
        else{
          if(typeof challenge[0].img === 'undefined'){
            res.status(200).json({
              message:"no pic"
            });
          }
          else{
          fs.readFile( __dirname + '/../resource/challenge/'+challenge[0].img, function(err, data) {
           if (err) res.status(500).json({
                message: err
            }); // Fail if the file can't be read.
           res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data); // Send the file data to the browser.
           });
        }
        }
  })
};

function getAnswer(req,res){
  Challenge.find({No:req.params.number},function(err,challenge){
      if(err){
        res.status(500).json({
                message: err
            });
      }
      else{
        res.status(200).json({
              message:"success",
              question:challenge[0].question,
              answer:challenge[0].answer
            });
      }
  })
}


module.exports = function(router) {

  router.route('/challenge/:number')
  .get(getChallenge)
  router.route('/challenge/pic/:number')
  .get(getImage)
  router.route('/challenge/:number/key')
  .get(getAnswer)

  return router;
};