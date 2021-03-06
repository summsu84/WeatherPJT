/**
 * Created by JJW on 2019-04-08,
 * 생활 기상 서비스
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
    const newGenValBase = {
        items:[]
    };
    const newGenValItem = {
        item : {
            type: null,
            header: null,
            result: null
        }
    }

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
            newGenValItem.item.header = datas.Response.header;
            newGenValItem.item.type = type;
            newGenValItem.item.result = [];
            //newGenVal.header = retVal;
            onSuccess(newGenValItem, Const.responsecodeError);
        } else {
            retVal = datas.Response.body.indexModel;
            newGenValItem.item.header = datas.Response.header;
            newGenValItem.item.type = type;
            const tmpArray = [];
            for(const key in retVal)
            {
                let value = retVal[key];
                const tmpObject = {
                    title: key,
                    value: value,
                    description: '',
                    range: '',
                    useYn: (key === "code" || key === "areaNo" || key === "date") ? 'N' : 'Y'
                }

                if(tmpObject.useYn == 'Y')
                {
                    const tmpResult = getDescriptionInfo(type, value);
                    tmpObject.description = tmpResult.description;
                    tmpObject.range = tmpResult.range;
                    tmpArray.push(tmpObject);
                }

            }
            newGenValItem.item.result = tmpArray;
            const typeObject = {};
            typeObject[type] = retVal;
            newGenVal.items = typeObject;
            onSuccess(newGenValItem);
        }
    }
}

let getDescriptionInfo =(type, value) =>
{
    if(type === Const.FSN_ITEM)
    {
        return getFsnDescriptionInfo(value);
    }else if(type === Const.SENSORYTEM_ITEM)
    {
        return getSensorytemDescriptionInfo(value);
    }else if(type === Const.HEAT_ITEM)
    {
        return getHeatLifeDescriptionInfo(value);
    }else if(type === Const.DSPIS_ITEM)
    {
        return getDsplsLifeDescriptionInfo(value);
    }else if(type === Const.WINTER_ITEM)
    {
        return getWinterLifeDescriptionInfo(value);
    }else if(type === Const.ULTRV_ITEM)
    {
        return getUltrvLifeDescriptionInfo(value);
    }
    else {
        //대기오염확산지수
        return getAirpollutionLifeDescriptionInfo(value);
    }
}

/**
 *  식중독 지수 설명 정보
 */
let getFsnDescriptionInfo = (value) =>
{
    let retVal = {
        description: '',
        range: ''
    };
    if(value >= 86)
    {
        retVal.description = Const.FSN_VALUE_VERY_HIGH;
        retVal.range = Const.WEATHERLIFE_RANGE_VERY_HIGH;

    }else if(value >= 71 && value < 86)
    {
        retVal.description = Const.FSN_VALUE_HIGH;
        retVal.range = Const.WEATHERLIFE_RANGE_HIGH;
    }else if(value >= 55 && value < 71)
    {
        retVal.description = Const.FSN_VALUE_NORMAL;
        retVal.range = Const.WEATHERLIFE_RANGE_NORMAL;
    }else
    {
        retVal.description = Const.FSN_VALUE_GOOD;
        retVal.range = Const.WEATHERLIFE_RANGE_LOW;
    }

    return retVal;
}

/**
 *  체감온도 지수 설명 정보
 */
let getSensorytemDescriptionInfo = (value) =>
{
    let retVal = {
        description: '',
        range: ''
    };
    if(value < -45)
    {
        retVal.description = Const.SENSORYTEM_VALUE_DANGER;     // 위험
        retVal.range = Const.WEATHERLIFE_RANGE_DANGER;

    }else if(value > -25 && value <= -45)
    {
        retVal.description = Const.SENSORYTEM_VALUE_ALERT;
        retVal.range = Const.WEATHERLIFE_RANGE_ALERT;
    }else if(value > -10 && value <= -25)
    {
        retVal.description = Const.SENSORYTEM_VALUE_CAUTION;
        retVal.range = Const.WEATHERLIFE_RANGE_CAUTION;
    }else
    {
        retVal.description = Const.SENSORYTEM_VALUE_LOW;
        retVal.range = Const.WEATHERLIFE_RANGE_LOW;
    }

    return retVal;
}


/**
 *  열 지수 설명 정보
 */
let getHeatLifeDescriptionInfo = (value) =>
{
    let retVal = {
        description: '',
        range: ''
    };
    if(value >= 66)
    {
        retVal.description = Const.HEAT_VALUE_DANGER;
        retVal.range = Const.WEATHERLIFE_RANGE_DANGER;

    }else if(value >= 54 && value < 65)
    {
        retVal.description = Const.HEAT_VALUE_VERY_HIGH;
        retVal.range = Const.WEATHERLIFE_RANGE_VERY_HIGH;
    }else if(value >= 41 && value < 54)
    {
        retVal.description = Const.HEAT_VALUE_HIGH;
        retVal.range = Const.WEATHERLIFE_RANGE_VERY_HIGH;
    }else if(value >= 32 && value < 41)
    {
        retVal.description = Const.HEAT_VALUE_NORMAL;
        retVal.range = Const.WEATHERLIFE_RANGE_NORMAL;
    }
    else
    {
        retVal.description = Const.HEAT_VALUE_LOW;
        retVal.range = Const.WEATHERLIFE_RANGE_LOW;
    }
    return retVal;
}

/**
 *  불쾌 지수 설명 정보
 */
let getDsplsLifeDescriptionInfo = (value) =>
{
    let retVal = {
        description: '',
        range: ''
    };
    if(value >= 80)
    {
        retVal.description = Const.DSPIS_VALUE_VERY_HIGH;
        retVal.range = Const.WEATHERLIFE_RANGE_VERY_HIGH;

    }else if(value >= 75 && value < 80)
    {
        retVal.description = Const.DSPIS_VALUE_HIGH;
        retVal.range = Const.WEATHERLIFE_RANGE_HIGH;
    }else if(value >= 68 && value < 75)
    {
        retVal.description = Const.DSPIS_VALUE_NORMAL;
        retVal.range = Const.WEATHERLIFE_RANGE_NORMAL;
    }else
    {
        retVal.description = Const.DSPIS_VALUE_LOW;
        retVal.range = Const.WEATHERLIFE_RANGE_LOW;
    }
    return retVal;
}

/**
 *  동파가능 지수 설명 정보
 */
let getWinterLifeDescriptionInfo = (value) =>
{
    let retVal = {
        description: '',
        range: ''
    };
    if(value === 100)
    {
        retVal.description = Const.WINTER_VALUE_VERY_HIGH;
        retVal.range = Const.WEATHERLIFE_RANGE_VERY_HIGH

    }else if(value === 75)
    {
        retVal.description = Const.WINTER_VALUE_VERY_HIGH;
        retVal.range = Const.WEATHERLIFE_RANGE_VERY_HIGH;
    }else if(value === 50)
    {
        retVal.description = Const.WINTER_VALUE_NORMAL;
        retVal.range = Const.WEATHERLIFE_RANGE_NORMAL;
    }else if(value === 25)
    {
        retVal.description = Const.WINTER_VALUE_LOW;
        retVal.range = Const.WEATHERLIFE_RANGE_LOW;
    }
    return retVal;
}

/**
 *  자외선 지수 설명
 * @param value
 * @returns {{description: string, range: string}}
 */
let getUltrvLifeDescriptionInfo = (value) =>
{
    let retVal = {
        description: '',
        range: ''
    };
    if(value > 11)
    {
        retVal.description = Const.ULTRY_VALUE_DANGER;
        retVal.range = Const.WEATHERLIFE_RANGE_DANGER;

    }else if(value >= 8 && value <= 10)
    {
        retVal.description = Const.ULTRY_VALUE_VERY_HIGH;
        retVal.range = Const.WEATHERLIFE_RANGE_VERY_HIGH;
    }else if(value >= 6 && value <= 7)
    {
        retVal.description = Const.ULTRY_VALUE_HIGH;
        retVal.range = Const.WEATHERLIFE_RANGE_HIGH;
    }else if(value >= 3 && value <= 5)
    {
        retVal.description = Const.ULTRY_VALUE_NORMAL;
        retVal.range = Const.WEATHERLIFE_RANGE_NORMAL;
    }else
    {
        retVal.description = Const.ULTRY_VALUE_LOW;
        retVal.range = Const.WEATHERLIFE_RANGE_LOW;
    }
    return retVal;
}

let getAirpollutionLifeDescriptionInfo = (value) =>
{
    let retVal = {
        description: '',
        range: ''
    };
    if(value === 100)
    {
        retVal.description = Const.AIRPOLLUTION_VALUE_LOW;
        retVal.range = Const.WEATHERLIFE_RANGE_LOW;

    }else if(value === 75)
    {
        retVal.description = Const.AIRPOLLUTION_VALUE_NORMAL;
        retVal.range = Const.WEATHERLIFE_RANGE_NORMAL;
    }else if(value === 50)
    {
        retVal.description = Const.AIRPOLLUTION_VALUE_HIGH;
        retVal.range = Const.WEATHERLIFE_RANGE_HIGH;
    }else if(value === 25)
    {
        retVal.description = Const.ULTRY_VALUE_VERY_HIGH;
        retVal.range = Const.WEATHERLIFE_RANGE_VERY_HIGH;
    }
    return retVal;
}
module["exports"] = WeatherLifeServiceLogic;


