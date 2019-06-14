const TimeWeatherActionHandler = require('./base/timeweather-action-handler');

/**
 * 시간별 날씨 정보 라우트
 *
 * 1. 시간별 날씨는 동네예보 정보 서비스를 이용하여 제공한다.
 *
 * @param app
 * @returns {Router|router|*}
 */
module.exports = function(app)
{
    var express = require('express');
    var router = express.Router();

    //시간별
    router.get('/all/:date/:time/:nx/:ny', function(req, res){
        // 날짜, 시간, 선택한 위치의 위경도 좌표에 따라 주간 날씨 정보를 제공한다.
        processGetRequest('ForecastAll', req, res);
    });

    router.get('/space/:date/:time/:nx/:ny', function(req, res){
        // 날짜, 시간, 선택한 위치의 위경도 좌표에 따라 주간 날씨 정보를 제공한다.
        processGetRequest('ForecastSpace', req, res);
    });

    const processGetRequest = (action, req, res) =>
    {
        res.header("Access-Control-Allow-Origin", "*");
        console.log('processGetRequest [action] : ' + action);
        try {
            const params = req.params;
            TimeWeatherActionHandler.processAction(action, params, req, res);
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