var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());

var main = require('./router/main')(app);
app.use('/', main);

// 항공기상
var metar = require('./router/metar')(app);
app.use('/metar', metar);

// 
var airport = require('./router/airport')(app);
app.use('/airport', airport);

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server = app.listen(9000, function(){
    console.log("Server has started on port 9000");
})

// Router로 Request 처리하기
//app.get('/', function(req, res){
//    res.send('Hello Wordl');
//});