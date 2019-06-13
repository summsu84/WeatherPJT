/**
 * Created by JJW on 2017-07-20.
 */

const RequestHandlerBase = require("../../common/base/RequestHandlerBase");
const _ = require('lodash');
const Const = require('../../common/const/const');
const WeeklyWeatherServiceLogic = require('../service/weeklyweather-service');

var WeeklyWeatherActionHandler = function(){

}

_.extend(WeeklyWeatherActionHandler.prototype,RequestHandlerBase.prototype);

WeeklyWeatherActionHandler.prototype.processAction = function(action, param, req, res){

    var self = this;
    const selfRes = res;
    /**********************************************************
     *  Author : JJW
     *  Desc :  동네 예보 조회 서비스
     *  Date : 20190508
     ***********************************************************/
    if(action === 'ForecastSpace')
    {
        WeeklyWeatherServiceLogic.getForecastSpaceDate(param, (result) => {
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
     *  Desc :  중기기온 조회 서비스
     *  Date : 20190508
     ***********************************************************/
    else if(action === 'MiddleTemperature')
    {
        WeeklyWeatherServiceLogic.getMiddleTemperature(param, (result) => {
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
    /**********************************************************
     *  Author : JJW
     *  Desc :  중기육상 조회 서비스
     *  Date : 20190508
     ***********************************************************/
    else if(action === 'MiddleLandWeather')
    {
        WeeklyWeatherServiceLogic.getMiddleLandWeather(param, (result) => {
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
    /**********************************************************
     *  Author : JJW
     *  Desc :  중기육상 조회 전체 서비스
     *  Date : 20190508
     ***********************************************************/
    else if(action === 'MiddleForecastAll')
    {
        //콜백 처리 (프로마이즈 미사용 버전)
        const retVal = {
            items:[]
        };
        // 중기 전망
        WeeklyWeatherServiceLogic.getMiddleForecastWeather(param, (result) => {
            //성공시
            retVal.items.push(result);
            WeeklyWeatherServiceLogic.getMiddleTemperature(param, (result) => {
                //성공시
                retVal.items.push(result);
                WeeklyWeatherServiceLogic.getMiddleLandWeather(param, (result) => {
                    //성공시
                    retVal.items.push(result);
                    self.successResponse(selfRes,Const.responsecodeSucceed, retVal);
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

module["exports"] = new WeeklyWeatherActionHandler();