const WeeklyWeatherActionHandler = require('./base/weeklyweather-action-handler');

/**
 * 주간 날씨 정보 라우트
 *
 * 1. 주간 날씨 정보는 최초 3일 정보는 우리기상정보 서비스 이용하며,
 * 2. 그 외의의 경우 중기 날씨 서비스 이용하여 1주일 정보를 제공한다.
 *
 * @param app
 * @returns {Router|router|*}
 */
module.exports = function(app)
{
    var express = require('express');
    var router = express.Router();

    //시간별
    router.get('/time/all/:date/:time/:nx/:ny', function(req, res){
        // 날짜, 시간, 선택한 위치의 위경도 좌표에 따라 주간 날씨 정보를 제공한다.
        processGetRequest('ForecastAll', req, res);
    });

    router.get('/time/space/:date/:time/:nx/:ny', function(req, res){
        // 날짜, 시간, 선택한 위치의 위경도 좌표에 따라 주간 날씨 정보를 제공한다.
        processGetRequest('ForecastSpace', req, res);
    });



    // 중기 정보 모두
    router.get('/middleforecast/all/:time/:landRegId/:tempRegId/:stnId', function(req, res){
        // 날짜, 선택한 위치에 따라 중기 날씨 정보를 모두 제공한다.
        processGetRequest('MiddleForecastAll', req, res);
    });

    // 중기 전망
    router.get('/forecast/middleforecast/:time/:stnId', function(req, res){
        // 날짜, 선택한 위치에 따라 중기 날씨 정보를 제공한다.
        processGetRequest('MiddleForecast', req, res);
    });

    // 중기 기온 전망
    router.get('/forecast/middletemperature/:time/:tempRegId', function(req, res){
        // 날짜, 선택한 위치에 따라 중기 날씨 정보를 제공한다.
        processGetRequest('MiddleTemperature', req, res);
    });

    // 중기 날씨 전망
    router.get('/forecast/middlelandweather/:time/:landRegId', function(req, res){
        // 날짜, 선택한 위치에 따라 중기 육지 날씨 정보를 제공한다.
        processGetRequest('MiddleLandWeather', req, res);
    });

    const processGetRequest = (action, req, res) =>
    {
        res.header("Access-Control-Allow-Origin", "*");
        console.log('processGetRequest [action] : ' + action);
        try {
            const params = req.params;
            WeeklyWeatherActionHandler.processAction(action, params, req, res);
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