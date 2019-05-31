const EarthQuakeActionHandler = require('./base/earthquake-action-handler');

module.exports = function(app)
{
    var express = require('express');
    var router = express.Router();

    // 지진정보문목록 조회
    router.get('/earthquake/list/:fromdate/:todate/:rownum', function(req, res){
        processGetRequest('EarthquakeReportList', req, res);
    });
    // 지진정보 리포트
    router.get('/earthquake/report/:fromdate/:todate/:rownum', function(req, res){
        processGetRequest('EarthquakeReport', req, res);
    });
    // 쓰나미정보


    const processGetRequest = (action, req, res) =>
    {
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const params = req.params;
            EarthQuakeActionHandler.processAction(action, params, req, res);
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
};