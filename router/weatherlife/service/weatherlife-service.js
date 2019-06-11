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
/*                const datas = JSON.parse(body);
                // header 정보 파싱
                const successYN = datas.Response.header.successYN;
                let retVal;
                if(successYN === "N") {
                    retVal = datas.Response.header;
                    onError(retVal);
                }else
                {
                    retVal = datas.Response.body.indexModel;
                    onSuccess(retVal);
                }*/

                parsingResultOfWeatherLife(Const.FSN_ITEM, body, onSuccess, onError);

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
                //onSuccess(JSON.parse(body));
                parsingResultOfWeatherLife(Const.SENSORYTEM_ITEM, body, onSuccess, onError);
            }
        });

    },
    // 열지수 조회 서비스
    getHeatLife : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.WEATHERLIFE_BASE_URL, Const.HEAT_URL, ServiceKeyConfig.WEATHER_LIFE_SERVICE_KEY);
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
                parsingResultOfWeatherLife(Const.HEAT_ITEM, body, onSuccess, onError);
            }
        });
    },
    // 불쾌 지수 조회 서비스
    getDsplsLife : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.WEATHERLIFE_BASE_URL, Const.DSPIS_URL, ServiceKeyConfig.WEATHER_LIFE_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                parsingResultOfWeatherLife(Const.DSPIS_ITEM, body, onSuccess, onError);
            }
        });
    },
// 동파가능지수 조회 서비스
    getWinterLife : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.WEATHERLIFE_BASE_URL, Const.WINTER_URL, ServiceKeyConfig.WEATHER_LIFE_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                parsingResultOfWeatherLife(Const.WINTER_ITEM, body, onSuccess, onError);
            }
        });

    },
    // 자외선 지수
    getUltrvLife : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.WEATHERLIFE_BASE_URL, Const.ULTRV_URL, ServiceKeyConfig.WEATHER_LIFE_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                parsingResultOfWeatherLife(Const.ULTRV_ITEM, body, onSuccess, onError);
            }
        });
    },
// 대기 확산 지수 airpollutionlife
    getAirPollutionLife : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.WEATHERLIFE_BASE_URL, Const.AIRPOLLUTION_URL, ServiceKeyConfig.WEATHER_LIFE_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                parsingResultOfWeatherLife(Const.AIRPOLLUTION_ITEM, body, onSuccess, onError);
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
                parsingResultOfWeatherLife(body, onSuccess, onError);
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

let parsingResultOfWeatherLife = (type, body, onSuccess, onError) =>
{
    const datas = JSON.parse(body);

    const newGenVal =
        {
            "header" : null,
            "items" : null,
            "itemType" : type
        };

    // header 정보 파싱
    if(datas.hasOwnProperty("response"))
    {
        if(datas.response.header.resultCode === "12")
            onSuccess(datas.response.header,Const.responsecodeError);
    }else {
        const successYN = datas.Response.header.successYN;
        let retVal;
        if (successYN === "N") {
            retVal = datas.Response.header;
            newGenVal.header = retVal;
            onSuccess(newGenVal, Const.responsecodeError);
        } else {
            retVal = datas.Response.body.indexModel;
            newGenVal.header = datas.Response.header;
            const typeObject = {};
            typeObject[type] = retVal;
            newGenVal.items = typeObject;
            onSuccess(newGenVal);
        }
    }
}



module["exports"] = WeatherLifeServiceLogic;


