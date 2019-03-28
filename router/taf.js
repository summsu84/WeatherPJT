var TafFetcher = require('metar-taf').TafFetcher;
var metar = require('../lib/taf_lib.js');
var http = require('http')
var parseString = require('xml2js').parseString
var dateFormat = require('dateformat');
var mongodb = require('mongodb');


var tafFetcher = new TafFetcher();

module.exports = function(app)
{
    var express = require('express');
    var router = express.Router();


    // taf 데이터 요청
    // url : /taf/search?icao_cd=RKSI
    router.get('/search', function(req, res){
        var url = 'http://amoapi.kma.go.kr/amoApi/taf';
        var icao_cd = req.query.icao_cd;
        var result_data;

        metar.xmlToJson(url+'?icao='+icao_cd, function(err, data){
            if (err) {
                return console.err(err);
            }
            var get_data = JSON.stringify(data, null, 2);
            console.log(get_data);
            gd = JSON.parse(get_data);
    
            // 데이터 분리
            code = gd.response.body[0].items[0].item[0].icaoCode[0];
            name = gd.response.body[0].items[0].item[0].airportName[0];
            dd = gd.response.body[0].items[0].item[0].metarMsg[0];
            console.log(dd);
    
            // TAF 분석 => https://www.npmjs.com/package/metar-taf
            tafFetcher.getData(code).then(function(response){
                console.log(response);
            })
            var metar = parseTAF(dd);
            var reg_dt=dateFormat(new Date(), "yyyymmddhh");
            metar['reg_dt'] = reg_dt;
            //var metar = metar_analysis_process(code, name, dd);
            console.log(metar);
    
            // Mongodb에 데이터 등록
            var client = mongodb.MongoClient;
            var db_url = 'mongodb://localhost:27017/weather_db';
    
            client.connect(db_url, function(err, database){
                if (err) {
                    console.log(err);
                }else {
                    console.log("database connected : " + database);
                    var db = database.db('weather_db');
    
                    // 중복 체크
                    var query = {
                            'station': metar.station, 
                            'reg_dt': metar.reg_dt
                    };
    
                    db.collection('metar').find(query).count(function(err, count){
                        console.log("cnt : " + count);
                        if (count == 0)
                            db.collection('metar').insertOne(metar);
                        else
                            console.log('이미 등록이 되어 있습니다!!!');
                    });
                }
            })
    
            
            client.connect(db_url, function(err, database){
                if (err) {
                    console.log(err);
                }else {
                    var db = database.db('weather_db');
                    var where = {'station': metar.station, 'reg_dt': metar.reg_dt};
                    var cursor = db.collection('metar').find(where);
                    cursor.forEach(function(doc){
                        result_data = doc;
                        console.log(JSON.stringify(result_data));
    
                        console.log("result_data : ");
                        console.log(result_data);
                        // 데이터 리턴
                        // var data = {};
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(result_data));
    
                    })                
                }
                database.close();
            })
        });
    });

    return router;
}    