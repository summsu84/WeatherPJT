/**
 * Created by JJW on 2019-04-08,
 */

const Const = require('../../common/const/const');
const ServiceKeyConfig = require('../../../service-key-config');
const request = require('request');

const ThunderStrokeServiceLogic = {
    // 낙뢰 정보 검색 결과 조회
    getThunderStrokeInfo : (params, onSuccess, onError) => {
        const stDate = params.stDate;
        const edDate = params.edDate;
        const stLati = params.stLati;
        const edLati = params.edLati;
        const stLong = params.stLong;
        const edLong = params.edLong;

        const requestUrl = `${Const.THUNDERSTROKE_BASE_URL}${Const.THUNDERSTROKE_INFO_URL}?serviceKey=${ServiceKeyConfig.THUNDERSTROKE_SERVICE_KEY}&stDate=${stDate}&edDate=${edDate}&stLati=${stLati}&edLati=${edLati}&stLong=${stLong}&edLong=${edLong}&_type=json`;
        const options = {
            url: requestUrl,
            method: 'GET',
        };

        /**
         *  현재 일 기준 내일, 모레 정보를
         *  오전 오후 최저 최고 값
         *  오전 오후 SKY 값 제공
         */

        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우 파싱 한 후 제공
                //onSuccess(JSON.parse(body));
                //성공인 경우..
                //const retVal = parsingResultOfForecastSpace(body);
                const parsedBody = JSON.parse(body);
                const retVal =
                    {
                        "header" : parsedBody.response.header,
                        "items" : parsedBody.response.body.items,
                        "totalCount" : parsedBody.response.body.totalCount
                    }
                onSuccess(retVal);
            }
        });

    }

};


module["exports"] = ThunderStrokeServiceLogic;


