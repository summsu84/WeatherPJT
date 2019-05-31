
var Const = require('../const/const')

var RequestHandlerBase = function(){
    
}

RequestHandlerBase.prototype.errorResponse = function(
        response,
        httpCode){

    response.status(httpCode);
    response.send("");
    
}

RequestHandlerBase.prototype.successResponse = function(response, code, data){
    console.log(">>[RequestHandlerBase] code : " + code);
    //response.status(Const.httpCodeSucceed);
    
    if(code != Const.responsecodeSucceed){

        //success 코드가 아닌 경우..
         response.json({
            code : code
        });
        
    } else {

       response.json({
            code : Const.responsecodeSucceed,
            data : data
        });
    }

    
}

module["exports"] = RequestHandlerBase;