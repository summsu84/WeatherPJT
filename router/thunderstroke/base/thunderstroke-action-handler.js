/**
 * Created by JJW on 2017-07-20.
 */

const RequestHandlerBase = require("../../common/base/RequestHandlerBase");
const _ = require('lodash');
const Const = require('../../common/const/const');
const ThunderStrokeServiceLogic = require('../service/thunderstroke-service');

let ThunderStrokeActionHandler = function(){

}

_.extend(ThunderStrokeActionHandler.prototype,RequestHandlerBase.prototype);

ThunderStrokeActionHandler.prototype.processAction = function(action, param, req, res){

    const self = this;
    const selfRes = res;
    /**********************************************************
     *  Author : JJW
     *  Desc :  낙뢰 정보 조회 서비스
     *  Date : 20190610
     ***********************************************************/
    if(action === 'ThunderStrokeInfo')
    {
        ThunderStrokeServiceLogic.getThunderStrokeInfo(param, (result) => {
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
};

module["exports"] = new ThunderStrokeActionHandler();