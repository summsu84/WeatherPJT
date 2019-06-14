/**
 * Created by JJW on 2019-04-08,
 */

const Const = require('../../common/const/const');
const ServiceKeyConfig = require('../../../service-key-config');
const request = require('request');
const CommonService = require('../../common/util');

const WeeklyWeatherServiceLogic = {
    // 중기 기온 조회 서비스
    getMiddleTemperature : (params, onSuccess, onError) => {
        const options = CommonService.getMiddleForecastTempUrl(params, Const.MID_BASE_URL, Const.MID_TEMP_URL, ServiceKeyConfig.WEEKLY_WEATHER_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                CommonService.parsingResultOfMiddleForecastInfo(Const.MID_TEMP_ITEM, body, onSuccess, onError);
            }
        });
    },
    // 중기 육상 조회 서비스
    getMiddleLandWeather : (params, onSuccess, onError) => {
        const options = CommonService.getMiddleForecastLandUrl(params, Const.MID_BASE_URL, Const.MID_LAND_URL, ServiceKeyConfig.WEEKLY_WEATHER_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                //onSuccess(JSON.parse(body));
                CommonService.parsingResultOfMiddleForecastInfo(Const.MID_LAND_ITEM, body, onSuccess, onError);
            }
        });
    },
    // 중기 전망 서비스 stnId
    getMiddleForecastWeather : (params, onSuccess, onError) => {
    const options = CommonService.getMiddleForecastUrl(params, Const.MID_BASE_URL, Const.MID_FORECAST_URL, ServiceKeyConfig.WEEKLY_WEATHER_SERVICE_KEY);
    request(options, (error, response, body) => {
        if (error) {
            console.error(error);
            if (onError)
                onError(err, null);
        } else if (response.statusCode !== 200) {
            console.error(body);
        } else {
            //성공인 경우..
            CommonService.parsingResultOfMiddleForecastInfo(Const.MID_FORECAST_ITEM, body, onSuccess, onError);

        }
    });
    },

};

module["exports"] = WeeklyWeatherServiceLogic;


