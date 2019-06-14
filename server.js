var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());

var main = require('./router/main')(app);
app.use('/', main);

// 항공기상 - METAR
var metar = require('./router/metar')(app);
app.use('/metar', metar);

// 항공기상 - TAF
var taf = require('./router/taf')(app);
app.use('/taf', taf);

// 공항정보
var airport = require('./router/airport')(app);
app.use('/airport', airport);

// 시간별 날씨 정보 라우터 - JJW - 20190614
const timeweather = require('./router/timeweather/timeweather-route')(app);
app.use('/timeweather', timeweather);

// 주간 날씨 정보 라우터 - JJW - 20190405
const weeklyweather = require('./router/weeklyweather/weeklyweather-route')(app);
app.use('/weeklyweather', weeklyweather);

// 생활 기상 정보 라우터 - JJW - 20190408
const weatherlife = require('./router/weatherlife/weatherlife-route')(app);
app.use('/weatherlife', weatherlife);

// 지진 정보 라우터 - JJW -20190530
const earthquake = require('./router/earthquake/earthquake-route')(app);
app.use('/earthquake', earthquake);

// 낙뢰 정보 라우터
const thunderstroke = require('./router/thunderstroke/thunderstroke-route')(app);
app.use('/thunderstroke', thunderstroke);

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