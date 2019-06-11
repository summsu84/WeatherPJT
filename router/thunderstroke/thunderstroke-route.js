const ThunderStrokeActionHandler = require('./base/thunderstroke-action-handler');

module.exports = function(app)
{
    var express = require('express');
    var router = express.Router();
    // 낙뢰 정보 검색 결과 조회

    router.get('/info/:stData/:edDate/:stLati/:edLati/:stLong/:edLong', function(req, res){
        processGetRequest('ThunderStrokeInfo', req, res);
    });
    const processGetRequest = (action, req, res) =>
    {
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const params = req.params;
            ThunderStrokeActionHandler.processAction(action, params, req, res);
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