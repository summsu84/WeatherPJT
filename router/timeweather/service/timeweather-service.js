/**
 * Created by JJW on 2019-04-08,
 */

const Const = require('../../common/const/const');
const ServiceKeyConfig = require('../../../service-key-config');
const request = require('request');
const ParsingService = require('../../common/util');

const TimeWeatherServiceLogic = {
    // 동네예보 조회 서비스
    getForecastSpaceDate : (params, onSuccess, onError) => {
        const date = params.date;
        const time = params.time;
        const nx = params.nx;
        const ny = params.ny;

        const requestUrl = `${Const.TIMEWEATHER_BASE_URL}${Const.FORECAST_SPACE_URL}?serviceKey=${ServiceKeyConfig.TIME_WEATHER_SERVICE_KEY}&base_date=${date}&base_time=${time}&nx=${nx}&ny=${ny}&numOfRows=300&pageNo=1&_type=json`;
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
                //const retVal = parsingResultOfMiddleForecastISpaceNew(Const.FORECAST_SPACE_ITEM, body, onSuccess, onError);
                ParsingService.parsingResultOfMiddleForecastISpaceNew(Const.FORECAST_SPACE_ITEM, body, onSuccess, onError);
            }
        });

    }
};


module["exports"] = TimeWeatherServiceLogic;


