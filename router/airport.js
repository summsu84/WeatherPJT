var mongodb = require('mongodb');

module.exports = function(app)
{
    var express = require('express');
    var router = express.Router();
    
    router.post('/:id/:mode', function(req, res){
        if (req.params.id == "icao")
        {
            if(req.params.mode == "reg")
            {
                //console.log(req.body.icao_cd_list);

                var get_data = JSON.stringify(req.body.icao_cd_list, null, 2);
                //console.log(get_data);
                var data = JSON.parse(get_data);
                //var data = JSON.parse(req.body.icao_cd_list);
                var obj = [];
                obj.push(data);
                console.log(data['icao_cd']);

                var client = mongodb.MongoClient;
                var db_url = 'mongodb://localhost:27017/weather_db';
                console.log(obj);

                client.connect(db_url, function(err, database){
                    if (err) {
                        console.log(err);
                    }else {
                        //console.log("database connected : " + database);
                        var db = database.db('weather_db');
                        db.collection('icao_code').remove();

                        db.collection('icao_code').insertMany(JSON.parse(obj), {safe:true},  function(error, done){
                            if (error) {
                                console.log(error);
                                console.log("Error occurred while inserting!!");
                            }else {
                                console.log("inserted record", done.ops[0]);
                            }
                            res.render('icao_list.html')
                        });
                    }            
                });                 
            }
        }
    });

    // 공항정보 처리 (Restfull api)
    // /airport/icao/reg -- register
    // /airport/icao/list -- list
    // /airport/icao/del  -- delete
    // /airport/icao/upt  -- update
    router.get('/:id/:mode', function(req, res){
        if (req.params.id == "icao")
        {
            if (req.params.mode == "list")
            {
                var data = {
                    'RKSI' : "인천공항",
                    'RKSS' : "김포공항",
                    'RKPC' : "제주공항",
                    'RKPK' : "김해공항",
                    "RKNY" : "양양공항",
                    "RKNW" : "원주공항",
                    "RKTU" : "청주공항",
                    "RKTN" : "대구공항",
                    "RKTH" : "포항공항",
                    "RKJJ" : "광주공항",
                    "RKJB" : "무안공항",
                    "RKJY" : "여수공항",
                    "RKPU" : "울산공항",
                    "RKPS" : "사천공항",
                    "RKJK" : "군산공항"
                };
                console.log('/aiport/id/mode called....');
                console.log(req.params.id);
                console.log(req.params.mode);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(data));
            }else if(req.params.mode == "reg_list")
            {
                res.render('icao_list.html')
            }else if(req.params.mode == "code_list")
            {
                var client = mongodb.MongoClient;
                var db_url = 'mongodb://localhost:27017/weather_db';
            
                client.connect(db_url, function(err, database){
                    if (err) {
                        console.log(err);
                    }else {
                        console.log("database connected : " + database);
                        var db = database.db('weather_db');
                        var cursor = db.collection('icao_code').find();
                        var data = [];
                        cursor.forEach(function(doc){
                            data.push(doc);      
                        }, function allDone() {
                            console.log(data);
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify(data));
                        });            
                    }        
                }); 
            }
        }
    });



    return router;

}