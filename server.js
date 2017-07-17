var express = require('express');
var app = express();


var multer  = require('multer');
var upload = multer().single("file");

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/form.html');
});

app.post("/get-file-size",function (request, response) {
  upload(request, response, function (err){
    if (err){
      throw err;
      return;
    }
    
    response.json({ bytes: request.file.size,
                  name: request.file.originalname,
                  mimetype: request.file.mimetype,
                  encoding: request.file.encoding });
    response.sendStatus(200);
    
  });
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
