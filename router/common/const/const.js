(function(global) {
    "use strict;"

    // Class ------------------------------------------------
    var Const = {};

    Const.httpCodeSucceed = 200;
    Const.httpCodeFileNotFound = 404;
    Const.httpCodeSeverError = 500;
    Const.httpCodeAuthError = 503;

    Const.responsecodeSucceed = 1;

    //WeeklyWeather
    Const.WEEKLYWEATHER_BASE_URL = 'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/';
    Const.FORECAST_SPACE_URL = 'ForecastSpaceData';                                                                         //동네예보
    Const.MID_BASE_URL = 'http://newsky2.kma.go.kr/service/MiddleFrcstInfoService/';                                         //중기 예보 베이스 URL
    Const.MID_TEMP_URL = 'getMiddleTemperature';
    Const.MID_LAND_URL = 'MiddleLandWeather';

    //WeatherLife
    Const.WEATHERLIFE_BASE_URL = 'http://newsky2.kma.go.kr/iros/RetrieveLifeIndexService3/';
    Const.FSN_URL = 'getFsnLifeList';                                                           //식중독지수
    Const.SENSORYTEM_URL = 'getSensorytemLifeList';                                            //체감온도
    Const.HEAT_URL = 'getHeatLifeList';                                                              //열지수
    Const.DSPIS_URL= 'getDspIsLifeList';                                                          //불쾌지수
    Const.WINTER_URL = 'getWinterLifeList' ;                                                     //동파지수
    Const.ULTRV_URL = 'getUltrvLifeList';                                                       //자외선 지수
    Const.AIRPOLLUTION_URL = 'getAirpollutionLifeList' ;                                        //대기확산 지수

    //EarthQuake
    Const.EARTHQAUKE_BASE_URL = 'http://newsky2.kma.go.kr/service/ErthqkInfoService/';
    Const.EARTHQUAKE_REPORT_URL= 'EarthquakeReport';
    Const.EARTHQUAKE_REPORT_LIST_URL = 'EarthquakeReportList';

    Const.MSG_RESPONSE_SEARCH_WAYBILL = '배송조회 결과입니다.';




    // Exports ----------------------------------------------
    module["exports"] = Const;
    //module["exports"] = TestData;

})((this || 0).self || global);
