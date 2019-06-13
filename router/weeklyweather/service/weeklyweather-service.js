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

        const requestUrl = `${Const.WEEKLYWEATHER_BASE_URL}${Const.FORECAST_SPACE_URL}?serviceKey=${ServiceKeyConfig.TIME_WEATHER_SERVICE_KEY}&base_date=${date}&base_time=${time}&nx=${nx}&ny=${ny}&numOfRows=300&pageNo=1&_type=json`;
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
                const retVal = parsingResultOfMiddleForecastISpaceNew(Const.FORECAST_SPACE_ITEM, body, onSuccess, onError);
               // onSuccess(retVal);
                //onSuccess(JSON.parse(body));
               // parsingResultOfMiddleForecastInfo(Const.FORECAST_SPACE_ITEM, body, onSuccess, onError);
            }
        });

    },
    // 중기 기온 조회 서비스
    getMiddleTemperature : (params, onSuccess, onError) => {
        const options = getMiddleForecastTempUrl(params, Const.MID_BASE_URL, Const.MID_TEMP_URL, ServiceKeyConfig.WEEKLY_WEATHER_SERVICE_KEY);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                parsingResultOfMiddleForecastInfo(Const.MID_TEMP_ITEM, body, onSuccess, onError);
            }
        });
    },
    // 중기 육상 조회 서비스
    getMiddleLandWeather : (params, onSuccess, onError) => {
        const options = getMiddleForecastLandUrl(params, Const.MID_BASE_URL, Const.MID_LAND_URL, ServiceKeyConfig.WEEKLY_WEATHER_SERVICE_KEY);
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
                parsingResultOfMiddleForecastInfo(Const.MID_LAND_ITEM, body, onSuccess, onError);
            }
        });
    },
    // 중기 전망 서비스 stnId
    getMiddleForecastWeather : (params, onSuccess, onError) => {
    const options = getMiddleForecastUrl(params, Const.MID_BASE_URL, Const.MID_FORECAST_URL, ServiceKeyConfig.WEEKLY_WEATHER_SERVICE_KEY);
    request(options, (error, response, body) => {
        if (error) {
            console.error(error);
            if (onError)
                onError(err, null);
        } else if (response.statusCode !== 200) {
            console.error(body);
        } else {
            //성공인 경우..

            parsingResultOfMiddleForecastInfo(Const.MID_FORECAST_ITEM, body, onSuccess, onError);

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

let getMiddleForecastLandUrl = (params, baseUrl, serviceUrl, serviceKey) =>
{
    const regid = params.landRegId;
    const time = params.time;
    const requestUrl = `${baseUrl}${serviceUrl}?serviceKey=${serviceKey}&regId=${regid}&tmFc=${time}&pageNo=1&numOfRows=10&_type=json`;
    const options = {
        url: requestUrl,
        method: 'GET',
    };

    return options;
}

let getMiddleForecastTempUrl = (params, baseUrl, serviceUrl, serviceKey) =>
{
    const regid = params.tempRegId;
    const time = params.time;
    const requestUrl = `${baseUrl}${serviceUrl}?serviceKey=${serviceKey}&regId=${regid}&tmFc=${time}&pageNo=1&numOfRows=10&_type=json`;
    const options = {
        url: requestUrl,
        method: 'GET',
    };

    return options;
}


let getMiddleForecastUrl = (params, baseUrl, serviceUrl, serviceKey) =>
{
    const time = params.time;
    const stnId = params.stnId
    const requestUrl = `${baseUrl}${serviceUrl}?serviceKey=${serviceKey}&stnId=${stnId}&tmFc=${time}&pageNo=1&numOfRows=10&_type=json`;
    const options = {
        url: requestUrl,
        method: 'GET',
    };

    return options;
}


let getWithoutTime = () => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;

}

let parsingResultOfMiddleForecastInfo = (type, body, onSuccess, onError) =>
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
    if(datas.hasOwnProperty("Response"))
    {
        if(datas.response.header.resultCode === "12")
            onSuccess(datas.response.header,Const.responsecodeError);
    }else {
        const successYN = datas.response.header.resultCode;
        let retVal;
        if (successYN !== "0000") {
            newGenValItem.item.header = datas.response.header;
            newGenValItem.item.type = type;
            newGenValItem.item.result = [];
            //newGenVal.header = retVal;
            onSuccess(newGenValItem, Const.responsecodeError);
        } else {
            retVal = datas.response.body.items.item;
            newGenValItem.item.header = datas.response.header;
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
                tmpArray.push(tmpObject);
/*                if(tmpObject.useYn == 'Y')
                {
                    const tmpResult = getDescriptionInfo(type, value);
                    tmpObject.description = tmpResult.description;
                    tmpObject.range = tmpResult.range;
                    tmpArray.push(tmpObject);
                }*/

            }
            newGenValItem.item.result = tmpArray;
            const typeObject = {};
            typeObject[type] = retVal;
            newGenVal.items = typeObject;
            onSuccess(newGenValItem);
        }
    }
}


let parsingResultOfMiddleForecastISpaceNew = (type, body, onSuccess, onError) =>
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
    if(datas.hasOwnProperty("Response"))
    {
        if(datas.response.header.resultCode === "12")
            onSuccess(datas.response.header,Const.responsecodeError);
    }else {
        const successYN = datas.response.header.resultCode;
        let retVal;
        if (successYN !== "0000") {
            newGenValItem.item.header = datas.response.header;
            newGenValItem.item.type = type;
            newGenValItem.item.result = [];
            //newGenVal.header = retVal;
            onSuccess(newGenValItem, Const.responsecodeError);
        } else {
            retVal = datas.response.body.items.item;
            // retVal을 시간별로 나눠서
            let changedRetVal = generateForecastSpaceResultByTime(retVal);
            newGenValItem.item.header = datas.response.header;
            newGenValItem.item.type = type;
            newGenValItem.item.result = changedRetVal;
            onSuccess(newGenValItem);
        }
    }
}

let generateForecastSpaceResultByTime = (items) =>
{
    let prevFcstDate = 0;
    let curFcstDate = 0;
    let prevFcstTime = "";
    let curFcstTime = "";
    let tmpItems = [

    ];
    let idx = 0;
    items.forEach((v, i) => {
        // 현재 날씨 정보를 파싱한다.
        if(i === 0)
        {
            curFcstTime = v.fcstTime;
            prevFcstTime = v.fcstTime;
            tmpItems.push({
                time:[]
            });
        }else
        {
            curFcstTime = v.fcstTime;
        }
        //날짜가 같은 경우
        if(prevFcstTime === curFcstTime)
        {
            //시간이 같은 경우
            tmpItems[idx].time.push(v);
        }
        //날짜가 다른 경우
        else
        {
            tmpItems.push({
                time:[]
            });
            idx++;
            tmpItems[idx].time.push(v);
        }
        prevFcstTime = curFcstTime;
    });

    return tmpItems;
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

    // 우선 6시 15시 기준 데이터를 가져온다.
    // 현재 시간
    const date = new Date();
    const dateWithoutTime = getWithoutTime(date);
    let strDay = (date.getMonth() + 1) < 10 ? "0".concat((date.getMonth() + 1).toString()) : (date.getMonth() + 1).toString();
    let numberDate = Number((date.getFullYear()).toString() + strDay + (date.getDate().toString()));
    let numberHour = date.getHours();
    let currentT3h = null;
    let currentSky = null;
    let retVal = [];
    let prevfcstDate = null;
    let object = {};
    let idx = -1;
    tmpItems.forEach((v, i) => {
        // 오늘 시간
        if(v.fcstDate == numberDate)
        {
            //fcstTime이 숫자인지 스트링인지 판단한다.
            let fcstTime = null;
            if(typeof v.fcstTime === "number")
            {
                v.fcstTime = v.fcstTime.toString();
                fcstTime = Number((v.fcstTime.toString()).substring(0, 2));
            }else
            {
                fcstTime = Number(v.fcstTime.substring(0, 2));
            }

            if(fcstTime < numberHour)
            {
                if(v.category === "T3H"){
                    currentT3h = v;
                }else if(v.category === "SKY")
                    currentSky = v;
            }
        }else
        {
            // 오늘이 아닌 경우
            if(prevfcstDate != v.fcstDate)
            {
                // 날이 달라지는 경우
                retVal.push({
                    item: []
                });
                idx++;
            }

            if(v.fcstTime === "0600")
            {
                retVal[idx].item.push(v);
            }else if(v.fcstTime === "1500" || v.fcstTime === 1500)
            {
                v.fcstTime = v.fcstTime.toString();
                retVal[idx].item.push(v);
            }
        }
        prevfcstDate = v.fcstDate;
    });
    let itemtmp =
        {
            item : []
        };
    itemtmp.item.push(currentSky);
    itemtmp.item.push(currentT3h);


    //retVal.unshift(currentSky);
    //retVal.unshift(currentT3h);
    retVal.unshift(itemtmp);

    /*retVal.append(currentT3h);
    retVal.append(currentSky);*/


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
    return retVal;
}


module["exports"] = WeeklyWeatherServiceLogic;


