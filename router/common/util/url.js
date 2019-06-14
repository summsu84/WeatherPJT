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
    const stnId = params.stnId;
    const requestUrl = `${baseUrl}${serviceUrl}?serviceKey=${serviceKey}&stnId=${stnId}&tmFc=${time}&pageNo=1&numOfRows=10&_type=json`;
    const options = {
        url: requestUrl,
        method: 'GET',
    };

    return options;
}

exports.getRequestUrl = getRequestUrl;
exports.getMiddleForecastLandUrl = getMiddleForecastLandUrl;
exports.getMiddleForecastTempUrl = getMiddleForecastTempUrl;
exports.getMiddleForecastUrl = getMiddleForecastUrl;
