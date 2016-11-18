var fs = require('fs');


function test(req,res){
	 fs.readFile( __dirname + '/../resource/test/wiz.jpg', function(err, data) {
  	if (err) throw err; // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.end(data); // Send the file data to the browser.
  })
}

module.exports = function(router) {

  router.route('/pic')
  .get(test)

  return router;
};