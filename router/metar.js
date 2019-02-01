var metar = require('./metar_process.js');
var fileUpload = require('express-fileupload');
var XLSX = require('xlsx');
var fs = require('fs');

module.exports = function(app)
{
    var express = require('express');
    var router = express.Router();
    
    // default options
    router.use(fileUpload());

    // metar 데이터 요청
    // url : /metar/search?icao_cd=RKSI
    router.get('/search', function(req, res){
        metar.metar_process(req, res);
    });

    // 예보구역목록
    // url : /metar/list
    router.get('/list', function(req, res){
        res.render('metar_code_list.html')
    });

    // 예보구역정보 코드 리스트를 JSON 포멧으로 리턴한다.
    router.get('/metar_code_list', function(req, res) {
        metar.get_code_list(req, res, 'metar_code');

        // var result = metar.get_code_list('metar_code');
        // var array = {};
        // array['data'] = result;

        // console.log(array);

        // res.setHeader('Content-Type', 'application/json');
        // res.send(JSON.stringify(array));
    });

    // 예보구역목록 등록
    // url : /metar/upload
    // ref : https://github.com/richardgirges/express-fileupload/tree/master/example
    router.post('/upload', function(req, res) {
        if (Object.keys(req.files).length == 0)
        {
            return res.status(400).send('No files were uploaded.');
        }
        let xlsFile = req.files.ufile;
        xlsFile.mv('code_reg.xlsx', function(err) {
            if (err)
                return res.status(500).send(err);
            // file upload completed.
            var buf = fs.readFileSync("code_reg.xlsx");
            var wb = XLSX.read(buf, {type:'buffer'});
            var sb = metar.to_json(wb);            
            var data = sb['Sheet1'];

            // 데이터베이스 등록
            metar.metar_code_reg(data, 'metar_code');

            res.render('metar_code_list.html')
        });
    });

    return router;
}