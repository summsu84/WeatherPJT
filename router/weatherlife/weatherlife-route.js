var fileUpload = require('express-fileupload');
var XLSX = require('xlsx');
var fs = require('fs');
const WeatherLifeActionHandler = require('./base/weatherlife-action-handler');

module.exports = function(app)
{
    var express = require('express');
    var router = express.Router();
    
    // default options
    // 생활기상 URI 구조
    // 1.
    router.get('/:area/:date', function(req, res){
    });

    // 식중독 지수 조회
    // url : /fsnlife
    router.get('/fsnlife/:areaNo/:date', function(req, res){
        processGetRequest('FsnLife', req, res);
    });

    // 체감온도 지수 조회
    // url : /sensorytemlife
    router.get('/sensorytemlife/:areaNo/:date', function(req, res){
        processGetRequest('SensorytemLife', req, res);
    });

    // 열 지수 조회
    // url : /heatlife
    router.get('/heatlife/:areaNo/:date', function(req, res){
        processGetRequest('HeatLife', req, res);
    });

    // 불쾌 지수 조회
    // url : /dsplslife
    router.get('/dsplslife/:areaNo/:date', function(req, res){
        processGetRequest('DspIsLife', req, res);
    });

    // 동파가능 지수 조회
    // url : /winterlife
    router.get('/winterlife/:areaNo/:date', function(req, res){
        processGetRequest('WinterLife', req, res);
    });

    // 자외선 지수 조회
    // url : /ultrvlife
    router.get('/ultrvlife/:areaNo/:date', function(req, res){
        processGetRequest('UltrvLife', req, res);
    });

    // 대기 확산 지수 조회
    // url : /airpollutionlife
    router.get('/airpollutionlife/:areaNo/:date', function(req, res){
        processGetRequest('AirpollutionLife', req, res);
    });

    // 더위 체감 지수 조회
    // url : /sensoryheatlife
    router.get('/sensoryheatlife/:areaNo/:date', function(req, res){
        processGetRequest('WinterLife', req, res);
    });

    const processGetRequest = (action, req, res) =>
    {
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const params = req.params;
            WeatherLifeActionHandler.processAction(action, params, req, res);
        } catch (err) {
            console.error("Can't process request", err);

            return res.status(400).json({
                status: {
                    code: 400,
                    errorType: err.message
                }
            });
        }
    };
    return router;
}