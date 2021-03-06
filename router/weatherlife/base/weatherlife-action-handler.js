/**
 * Created by JJW on 2017-07-20.
 */

const RequestHandlerBase = require("../../common/base/RequestHandlerBase");
const _ = require('lodash');
const Const = require('../../common/const/const');
const weatherlifeServiceLogic = require('../service/weatherlife-service');

var WeatherifeActionHandler = function(){

}

_.extend(WeatherifeActionHandler.prototype,RequestHandlerBase.prototype);

WeatherifeActionHandler.prototype.processAction = function(action, param, req, res){

    var self = this;
    const selfRes = res;
    /**********************************************************
     *  Author : JJW
     *  Desc :  식중독지수 조회 서비스
     *  Date : 20190408
     ***********************************************************/
    if(action === 'FsnLife')
    {

        weatherlifeServiceLogic.getFsnLife(param, (result, code) => {
            //성공시
            //let messageObj = generateContent(action, result);
            self.successResponse(selfRes, (code == null) ? Const.responsecodeSucceed : code, result);
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
     *  Desc :  체감온도 조회 서비스
     *  Date : 20190408
     ***********************************************************/
    else if(action === 'SensorytemLife')
    {
        weatherlifeServiceLogic.getSensoryTemLife(param, (result, code) => {
            //성공시
            self.successResponse(selfRes, (code == null) ? Const.responsecodeSucceed : code, result);
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
     *  Desc :  열지수 조회 서비스
     *  Date : 20190408
     ***********************************************************/
    else if(action === 'HeatLife')
    {
        weatherlifeServiceLogic.getHeatLife(param, (result, code) => {
            //성공시
            self.successResponse(selfRes, (code == null) ? Const.responsecodeSucceed : code, result);
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
     *  Desc :  불쾌지수 조회 서비스
     *  Date : 20190408
     ***********************************************************/
    else if(action === 'DspIsLife')
    {
        weatherlifeServiceLogic.getDsplsLife(param, (result, code) => {
            //성공시
            self.successResponse(selfRes, (code == null) ? Const.responsecodeSucceed : code, result);
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
     *  Desc :  동파지수 조회 서비스
     *  Date : 20190408
     ***********************************************************/
    else if(action === 'WinterLife')
    {
        weatherlifeServiceLogic.getWinterLife(param, (result, code) => {
            //성공시
            self.successResponse(selfRes, (code == null) ? Const.responsecodeSucceed : code, result);
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
     *  Desc :  자외선지수 조회 서비스
     *  Date : 20190408
     ***********************************************************/
    else if(action === 'UltrvLife')
    {
        weatherlifeServiceLogic.getUltrvLife(param, (result, code) => {
            //성공시
            self.successResponse(selfRes, (code == null) ? Const.responsecodeSucceed : code, result);
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
     *  Desc :  대기오염지수 조회 서비스
     *  Date : 20190408
     ***********************************************************/
    else if(action === 'AirpollutionLife')
    {
        weatherlifeServiceLogic.getAirPollutionLife(param, (result, code) => {
            //성공시
            self.successResponse(selfRes, (code == null) ? Const.responsecodeSucceed : code, result);
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
    else if(action === 'All')
    {
        //콜백 처리 (프로마이즈 미사용 버전)
        const retVal = {
            items:[]
        };
        // 식중독 정보 조회
        weatherlifeServiceLogic.getFsnLife(param, (result, code) => {
            //성공시
            retVal.items.push(result);
            weatherlifeServiceLogic.getSensoryTemLife(param, (result, code) => {
                //열 지수
                retVal.items.push(result);
                weatherlifeServiceLogic.getHeatLife(param, (result, code) => {
                    //불쾌지수
                    retVal.items.push(result);
                    weatherlifeServiceLogic.getDsplsLife(param, (result, code) => {
                        //동파지수
                        retVal.items.push(result);
                        weatherlifeServiceLogic.getWinterLife(param, (result, code) => {
                            //자외선 지수
                            retVal.items.push(result);
                            weatherlifeServiceLogic.getUltrvLife(param, (result, code) => {
                                //성공시
                                retVal.items.push(result);
                                // 대기 오염확산 지수
                                weatherlifeServiceLogic.getAirPollutionLife(param, (result, code) => {
                                    //성공시
                                    retVal.items.push(result);
                                    self.successResponse(selfRes, (code == null) ? Const.responsecodeSucceed : code, retVal);
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
    else if(action === 'GetFsnLife')
    {
        //token verify
        let authheader = req.headers['authorization'] || req.query.token

        const token = authheader.replace('bearer ', '');

        // token does not exist
        if(!token) {
            return res.status(403).json({
                success: false,
                message: 'not logged in'
            })
        }

        // get the decoded payload ignoring signature, no secretOrPrivateKey needed

        var decoded = jwt.decode(token);

        let messageObj = generateContent(action, decoded.id);

        self.successResponse(res,Const.responsecodeSucceed, messageObj.message, {
            messageObj
        });
    }

}

module["exports"] = new WeatherifeActionHandler();