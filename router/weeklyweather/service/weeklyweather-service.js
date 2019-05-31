/**
 * Created by JJW on 2019-04-08,
 */

const Const = require('../../common/const/const');
const ServiceKeyConfig = require('../../../service-key-config');
const request = require('request');

const WeeklyWeatherServiceLogic = {
    // 동네예보 조회 서비스
    getForecastSpaceDate : (params, onSuccess, onError) => {
        const date = params.date;
        const time = params.time;
        const nx = params.nx;
        const ny = params.ny;

        const requestUrl = `${Const.WEEKLYWEATHER_BASE_URL}${Const.FORECAST_SPACE_URL}?serviceKey=${ServiceKeyConfig.WEEKLY_WEATHER_SERVICE_KEY}&base_date=${date}&base_time=${time}&nx=${nx}&ny=${ny}&numOfRows=300&pageNo=1&_type=json`;
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
                const retVal = parsingResultOfForecastSpace(body);
                onSuccess(retVal);
            }
        });

    },
    // 중기 기온 조회 서비스
    getMiddleTemperature : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.MID_BASE_URL, Const.MID_TEMP_URL, ServiceKeyConfig.WEEKLY_WEATHER_SERVICE_KEY);
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
    // 중기 육상 조회 서비스
    getMiddleLandWeather : (params, onSuccess, onError) => {
        const options = getRequestUrl(params, Const.MID_BASE_URL, Const.MID_LAND_URL, ServiceKeyConfig.WEEKLY_WEATHER_SERVICE_KEY);
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



let parsingResultOfForecastSpace = (body) =>
{
    const datas = JSON.parse(body);
    const resultData = {
        "response": {
            "header": {
                "resultCode": "0000",
                "resultMsg": "OK"
            },
            "body": {
                "items": {
                    "item": [
                        {
                            "baseDate": 20190530,
                            "baseTime": "0500",
                            "category": "POP",
                            "fcstDate": 20190530,
                            "fcstTime": "0900",
                            "fcstValue": 10,
                            "nx": 59,
                            "ny": 126
                        }
                        ]
                }
            }
        }
    };
    const checkCategories = ['SKY', 'T3H', 'TMN', 'TMX'];
    let prevFcstDate = 0;
    let curFcstDate = 0;
    let prevFcstTime = "";
    let curFcstTime = "";
    let tmpItems = [];
    const items = datas.response.body.items.item;
    items.forEach((v, i) => {
       // 현재 날씨 정보를 파싱한다.
        if(i === 0)
        {
            curFcstDate = v.fcstDate;
            prevFcstDate = v.fcstDate;
            curFcstTime = v.fcstTime;
            prevFcstTime = v.fcstTime;
        }else
        {
            curFcstDate = v.fcstDate;
            curFcstTime = v.fcstTime;
        }
        //날짜가 같은 경우
        if(prevFcstDate === curFcstDate)
        {
            //시간이 같은 경우
            if(prevFcstTime === curFcstTime)
            {
                if(checkCategories.indexOf(v.category) !== -1)
                {
                    tmpItems.push(v);
                }
            }
        }
        //날짜가 다른 경우
        else
        {
            if(checkCategories.indexOf(v.category) !== -1)
            {
                tmpItems.push(v);
            }
        }

        prevFcstDate = curFcstDate;
        prevFcstTime = curFcstTime;

    });

    // 현재 시점에서 필요한 데이터
    // 1. 기온, SKY,

    // 내일 필요한 데이터
    // 1. 오전 최저, 오후 최고,
    // 2. 오전 SKY, 오후 SKY

    // 모레 필요한 데이터
    // 1. 오전 최저, 오후 최고,
    // 2. 오전 SKY, 오후 SKY
    /*const retItems = [];
    tmpItems.forEach((v, i) => {
        // 현재 날씨 정보를 파싱한다.
        if(i === 0)
        {
            curFcstDate = v.fcstDate;
            prevFcstDate = v.fcstDate;
            curFcstTime = v.fcstTime;
            prevFcstTime = v.fcstTime;
        }else
        {
            curFcstDate = v.fcstDate;
            curFcstTime = v.fcstTime;
        }
        //날짜가 같은 경우
        if(prevFcstDate === curFcstDate)
        {
            //시간이 같은 경우
            if(prevFcstTime === curFcstTime)
            {
                if(checkCategories.indexOf(v.category) !== -1)
                {
                    tmpItems.push(v);
                }
            }
        }
        //날짜가 다른 경우
        else
        {
            if(checkCategories.indexOf(v.category) !== -1)
            {
                tmpItems.push(v);
            }
        }

        prevFcstDate = curFcstDate;
        prevFcstTime = curFcstTime;

    });*/

    console.log("tmpItem");
    return tmpItems;
}


module["exports"] = WeeklyWeatherServiceLogic;


