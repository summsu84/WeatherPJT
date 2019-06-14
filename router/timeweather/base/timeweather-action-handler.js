/**
 * Created by JJW on 2017-07-20.
 */

const RequestHandlerBase = require("../../common/base/RequestHandlerBase");
const _ = require('lodash');
const Const = require('../../common/const/const');
const TimeWeatherServiceLogic = require('../service/timeweather-service');

var TimeWeatherActionHandler = function(){

}

_.extend(TimeWeatherActionHandler.prototype,RequestHandlerBase.prototype);

TimeWeatherActionHandler.prototype.processAction = function(action, param, req, res){

    var self = this;
    const selfRes = res;
    /**********************************************************
     *  Author : JJW
     *  Desc :  동네 예보 조회 서비스
     *  Date : 20190508
     ***********************************************************/
    if(action === 'ForecastSpace')
    {
        TimeWeatherServiceLogic.getForecastSpaceDate(param, (result) => {
            //성공시
            self.successResponse(selfRes,Const.responsecodeSucceed, result);
        },(err,code, msg)=>{
            // 실패 시
            if(err){

                self.errorResponse(
                    response,
                    Const.httpCodeSeverError
                );

            }else{

                self.successResponse(selfRes,code, msg, {});

            }

        });
    }
};

module["exports"] = new TimeWeatherActionHandler();