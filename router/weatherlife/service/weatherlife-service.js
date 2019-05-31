/**
 * Created by JJW on 2019-04-08,
 */

const Const = require('../../common/const/const');
const ServiceKeyConfig = require('../../../service-key-config');
const request = require('request');

const WeatherLifeServiceLogic = {

    // 식중독 지수 조회
    getFsnLife : (params, onSuccess, onError) => {

        const areaNo = params.areaNo;
        const time = params.date;
        const requestUrl = Const.WEATHERLIFE_BASE_URL + Const.FSN_URL + '?serviceKey=' + ServiceKeyConfig.WEATHER_LIFE_SERVICE_KEY +  '&areaNo=' + areaNo + '&time=' + time + '&type=json';
        //const requestUrl = BASE_URL + FSN_URL;

        /*const options = {
            url: requestUrl,
            qs: {
                serviceKey: SERVICE_KEY,
                areaNo: areaNo,
                time: time,
                type: 'json',
            },
            method: 'GET',
        };*/

        const options = {
            url: requestUrl,
            method: 'GET',
        };

        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                onSuccess(JSON.parse(body));
            }

        });

    },
    // 체감온도 지수 조회 서비스
    getSensoryTemLife : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.WEATHERLIFE_BASE_URL, Const.SENSORYTEM_URL, ServiceKeyConfig.WEATHER_LIFE_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                onSuccess(JSON.parse(body));
            }
        });

    },
    // 열지수 조회 서비스
    getHeatLife : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.WEATHERLIFE_BASE_URL, Const.SENSORYTEM_URL, ServiceKeyConfig.WEATHER_LIFE_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                onSuccess(JSON.parse(body));
            }
        });
    },
    // 불쾌 지수 조회 서비스
    getDsplsLife : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.WEATHERLIFE_BASE_URL, Const.SENSORYTEM_URL, ServiceKeyConfig.WEATHER_LIFE_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                onSuccess(JSON.parse(body));
            }
        });
    },
// 동파가능지수 조회 서비스
    getWinterLife : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.WEATHERLIFE_BASE_URL, Const.SENSORYTEM_URL, ServiceKeyConfig.WEATHER_LIFE_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                onSuccess(JSON.parse(body));
            }
        });

    },
    // 자외선 지수
    getUltrvLife : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.WEATHERLIFE_BASE_URL, Const.SENSORYTEM_URL, ServiceKeyConfig.WEATHER_LIFE_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                onSuccess(JSON.parse(body));
            }
        });
    },
// 대기 확산 지수 airpollutionlife
    getAirPollutionLife : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.WEATHERLIFE_BASE_URL, Const.SENSORYTEM_URL, ServiceKeyConfig.WEATHER_LIFE_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                onSuccess(JSON.parse(body));
            }
        });
    },
// 더위 체감 지수 조회
    getSensoryheatLife : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.WEATHERLIFE_BASE_URL, Const.SENSORYTEM_URL, ServiceKeyConfig.WEATHER_LIFE_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                onSuccess(JSON.parse(body));
            }
        });
    }
};

let getRequestUrl = (params, baseUrl, serviceUrl, serviceKey) =>
{
    const areaNo = params.areaNo;
    const time = params.date;
    const requestUrl = `${baseUrl}${serviceUrl}?serviceKey=${serviceKey}&areaNo=${areaNo}&time=${time}&_type=json`;
    const options = {
        url: requestUrl,
        method: 'GET',
    };

    return options;
}

module["exports"] = WeatherLifeServiceLogic;


