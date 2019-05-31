/**
 * Created by JJW on 2017-07-20.
 */

const RequestHandlerBase = require("../../common/base/RequestHandlerBase");
const _ = require('lodash');
const Const = require('../../common/const/const');
const EarthQuakeServiceLogic = require('../service/earthquake-service');

var EarthQuakeActionHandler = function(){

}

_.extend(EarthQuakeActionHandler.prototype,RequestHandlerBase.prototype);

EarthQuakeActionHandler.prototype.processAction = function(action, param, req, res){

    var self = this;
    const selfRes = res;
    /**********************************************************
     *  Author : JJW
     *  Desc :  지진정보문목록 조회 서비스
     *  Date : 20190530
     ***********************************************************/
    if(action === 'EarthquakeReportList')
    {

        EarthQuakeServiceLogic.getEarthquakeReportList(param, (result) => {
            //성공시
            //let messageObj = generateContent(action, result);
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
    /**********************************************************
     *  Author : JJW
     *  Desc :  지진통보문 조회 서비스
     *  Date : 20190530
     ***********************************************************/
    else if(action === 'EarthquakeReport')
    {
        EarthQuakeServiceLogic.getEarthquakeReport(param, (result) => {
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

module["exports"] = new EarthQuakeActionHandler();