var http = require('http')
var parseString = require('xml2js').parseString
var dateFormat = require('dateformat');
var mongodb = require('mongodb');
var XLSX = require('xlsx');
var parseMETAR = require('metar');

var xmlToJson = function(url, callback) {
    var req = http.get(url, function(res) {
        var xml = '';

        res.on('data', function(chunk){
            xml += chunk;
        });
        res.on('error', function(e){
            callback(e, null);
        });
        res.on('timeout', function(e){
            callback(e, null);
        });
        res.on('end', function(){
            parseString(xml, function(err, result){
                callback(null, result);
            })
        });
    });
}
// 풍향풍속 
// 35009KT  풍향:350 풍속:9 Knot
// 140P99KT 풍향:140 풍속: 100 Knot 이상
// 12006G18KT 풍향:120 풍속:평균6 Knot, 최대18 Knot
// VRB02KT 풍향:가변풍향  풍속:2 Knot
var metar_direction_spd_analsys = function(str) {
    var result_msg = {};

    if (str.length == 7) {
        if(str.indexOf("VRB") > -1) {
            result_msg['풍향'] = '가변풍향';
            result_msg['풍속'] = str.replace(/[^0-9]/g,"")+" Knot";
            //return_msg = "가변풍향 풍속:"+str.replace(/[^0-9]/g,"")+" Knot";
        }else {
            result_msg['풍향'] = str.substring(0,3);
            result_msg['풍속'] = str.substring(3,5)+" Knot";
            //return_msg = "풍향:"+str.substring(0,3)+" 풍속:"+str.substring(3,5)+" Knot";
        }        
    }else {
        if (str.indexOf("P99") > -1) {
            result_msg['풍향'] = str.substring(0,3);
            result_msg['풍속'] = "100 Knot 이상";
            //return_msg = "풍향:"+str.substring(0,3)+" 풍속: 100 Knot 이상";
        }else {
            result_msg['풍향'] = str.substring(0,3);
            result_msg['풍속'] = "평균"+str.substring(3,5)+" Knot, 최대:"+str.substring(6, 8);
            //return_msg = "풍향:"+str.substring(0,3)+" 풍속: 평균"+str.substring(3,5)+" Knot, 최대:"+str.substring(6, 8);
        }
    }
    return result_msg;    
}
// 수평시점
// VVVV - 6000 - 6km
// CAVOK- 10km이상 (Celling And Visibility OK)
var metar_horizontal_point = function(data)
{
    if (data == "CAVOK") {
        return "10km 이상";
    }else {
        return "6km 이내";  // 검토 필요
    }
}
// 기온
// M01/M16  -   기온 - 1 ℃   이슬점 온도- 16  ℃
// 04/01 - 기온 4 ℃  이슬점 온도 1 ℃ 
var metar_temperature_analysis = function(data){
    console.log("data : " + data);
    var arr = data.split("/");
    var result_msg = {};
    if (arr[0].indexOf("M") > -1)
    {
        result_msg['기온'] = "-"+arr[0].replace(/[^0-9]/g,"")+" ℃";
        //t1 = "기온 -"+arr[0].replace(/[^0-9]/g,"")+" ℃";
    }else {
        result_msg['기온'] = arr[0]+" ℃";
        //t1 = "기온 "+arr[0]+" ℃";
    }
    if (arr[1].indexOf("M") > -1)
    {
        result_msg['이슬점온도'] = "-"+arr[1].replace(/[^0-9]/g,"")+" ℃";
        //t2 = "이슬점 온도 -"+arr[1].replace(/[^0-9]/g,"")+" ℃";
    }else {
        result_msg['이슬점온도'] = arr[1]+" ℃";
        //t2 = "이슬점 온도 "+arr[1]+" ℃";
    }
    return result_msg;
}
// 기압
// Q1025 => 1025hpa
var metar_qnh_anaysis = function(data) {
    return data.substring(1)+"qnh";
}
// Metar Message를 분석한다.
// 형식 : METAR RKSI 240730Z 27011KT CAVOK 02/M16 Q1025 NOSIG=
// Space 기분으로 문자분리
// METAR(METerological Aviation Routing weather Report)
// - 해당공항의 현재 기상상황을 보고하는 리포트
var metar_analysis_process = function(code, name, data) {
    var arr = data.split(" ");
    var type = arr[0];         // METAR
    var airport_cd = arr[1];   // RKSI
    var tm = arr[2];           // 일시 : 240780Z
    var sp = arr[3];           // 풍향풍속 : 27011KT
    var sp2 = arr[4];          // 양극단풍향 : 120V180
    var sp3 = arr[5];          // 수평시점  CAVOK
    var tmpo = arr[6];         // 기온  02/M16 (기온 2도, 이슬점 온도 -16도)
    var q = arr[7];            // 기압 : Q1025 => 1025hpa
    
    var o = {};
    
    // var day=dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    var mon=dateFormat(new Date(), "yyyy-mm");
    var day = mon + "-" + tm.substring(0,2)+" " + tm.substring(2, 4) + ":"+tm.substring(4, 6)+":00";
    var direction_spd = metar_direction_spd_analsys(sp);
    var yang_spd = {'양극단풍향' : sp2};
    var horizontal_po = metar_horizontal_point(sp3);
    var temper = metar_temperature_analysis(tmpo);
    var qnh = metar_qnh_anaysis(q);
    
    // 데이터 포멧 형식
    // {
    //    icao_cd : 'RKSI',
    //    icao_nm : '인천공항',
    //    crt_dt  : '2018-09-12 13:31:00',
    //    dir_spd:  { origin:'35009KT', convert: '풍향~~~' },
    //    hor_pnt:  { origin: 'CAVOK',  convert: '~~~'},
    //    tempo : { origin: '02/M16', convert: '기온~~'},
    //    qnh : { origin: 'Q1025', 'convert': '1025hpa'}
    // }
    o['icao_cd'] = code;
    o['icao_nm'] = name;
    o['crt_dt']  = day;
    o['dir_spd'] = { 'origin': sp, 'convert': direction_spd };
    o['yang_spd'] = { 'origin': sp2, 'convert': yang_spd };
    o['hor_pnt'] = { 'origin' : sp3, 'convert': horizontal_po};
    o['temp'] = { 'origin': tmpo, 'convert': temper };
    o['qnh'] = { 'origin' : q, 'convert': qnh };
    o['origin'] = data;
    
    return o;    
}

var metar_process = function(req, res) {
    var url = 'http://amoapi.kma.go.kr/amoApi/metar';
    var icao_cd = req.query.icao_cd;
    var result_data;

    xmlToJson(url+'?icao='+icao_cd, function(err, data){
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

        // METAR 분석 => https://www.npmjs.com/package/metar
        var metar = parseMETAR(dd);
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
}

// XLXS 데이터를 읽어서 JSON 형태로 변환해서 리턴한다.
var to_json = function(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
            result[sheetName]  = roa;
        }
    });
    return result;
}

// 데이터베이스 코드 정보를 등록한다.
// output : JSON 데이터
// col_name : Collection 명
var metar_code_reg = function(output, col_name) {
    // Mongodb에 데이터 등록
    var client = mongodb.MongoClient;
    var db_url = 'mongodb://localhost:27017/weather_db';
    console.log(output);
    client.connect(db_url, function(err, database){
        if (err) {
            console.log(err);
        }else {
            console.log("database connected : " + database);
            var db = database.db('weather_db');
            db.collection(col_name).insertMany(output, {safe:true},  function(error, res){
                if (error) {
                    console.log(error);
                    console.log("Error occurred while inserting!!");
                }else {
                    console.log("inserted record", res.ops[0]);
                }
            });
        }            
    });    
}

var get_code_list = function(req, res, col_name) {
    // Mongodb에 데이터 등록
    var client = mongodb.MongoClient;
    var db_url = 'mongodb://localhost:27017/weather_db';

    client.connect(db_url, function(err, database){
        if (err) {
            console.log(err);
        }else {
            console.log("database connected : " + database);
            var db = database.db('weather_db');
            var cursor = db.collection(col_name).find();
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


module.exports = {
    metar_process, xmlToJson, metar_direction_spd_analsys, metar_horizontal_point,
    metar_temperature_analysis, metar_qnh_anaysis, metar_analysis_process, to_json,
    metar_code_reg, get_code_list
};