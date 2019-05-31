/**
 * Created by JJW on 2019-04-08,
 */

const Const = require('../../common/const/const');
const ServiceKeyConfig = require('../../../service-key-config');
const request = require('request');

const WeatherLifeServiceLogic = {

    /**********************************************************
     *  Author : JJW
     *  Desc :  지진정보문목록 조회 서비스
     *  Date : 20190530
     ***********************************************************/
    getEarthquakeReportList : (params, onSuccess, onError) => {

        const options = getEarthQuakeRequestUrl(params, Const.EARTHQAUKE_BASE_URL, Const.EARTHQUAKE_REPORT_LIST_URL, ServiceKeyConfig.EARTHQUAKE_SERVICE_KEY);

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
    /**********************************************************
     *  Author : JJW
     *  Desc :  지진통보문 조회 서비스
     *  Date : 20190530
     ***********************************************************/
    getEarthquakeReport : (params, onSuccess, onError) => {
        const options = getEarthQuakeRequestUrl(params, Const.EARTHQAUKE_BASE_URL, Const.EARTHQUAKE_REPORT_URL, ServiceKeyConfig.EARTHQUAKE_SERVICE_KEY);
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

/**********************************************************
 *  Author : JJW
 *  Desc :  지진정보 요청 URL 생성
 *  Date : 20190530
 ***********************************************************/
let getEarthQuakeRequestUrl = (params, baseUrl, serviceUrl, serviceKey) =>
{
    const fromdate = params.fromdate;
    const todate = params.todate;
    const rownum = params.rownum;
    const requestUrl = `${baseUrl}${serviceUrl}?serviceKey=${serviceKey}&fromTmFc=${fromdate}&toTmFc=${todate}&numOfRows=${rownum}&pageNo=1&_type=json`;
    const options = {
        url: requestUrl,
        method: 'GET',
    };

    return options;
}

module["exports"] = WeatherLifeServiceLogic;


