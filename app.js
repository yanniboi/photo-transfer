var express = require('express'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    busboy = require('connect-busboy'),
    http = require('http'),
    path = require('path'),
    util = require('util'),
    fs = require('fs'),
    app = express();

app.use(morgan("dev"));
app.use(busboy());
app.use(methodOverride());

app.post('/image', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});

app.use(express.static(path.join(__dirname, './uploads')));

app.listen(3000, function () {
    console.log('PictureFeed server listening on port 3000');
});
