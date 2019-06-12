(function(global) {
    "use strict;"

    // Class ------------------------------------------------
    var Const = {};

    Const.httpCodeSucceed = 200;
    Const.httpCodeFileNotFound = 404;
    Const.httpCodeSeverError = 500;
    Const.httpCodeAuthError = 503;

    Const.responsecodeSucceed = 1;
    Const.responsecodeError = 2;

    //WeeklyWeather
    Const.WEEKLYWEATHER_BASE_URL = 'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/';
    Const.FORECAST_SPACE_URL = 'ForecastSpaceData';                                                                         //동네예보
    Const.MID_BASE_URL = 'http://newsky2.kma.go.kr/service/MiddleFrcstInfoService/';                                         //중기 예보 베이스 URL
    Const.MID_TEMP_URL = 'getMiddleTemperature';
    Const.MID_LAND_URL = 'MiddleLandWeather';


    //WeatherLife
    Const.WEATHERLIFE_BASE_URL = 'http://newsky2.kma.go.kr/iros/RetrieveLifeIndexService3/';
    Const.FSN_URL = 'getFsnLifeList';                                                           //식중독지수
    Const.FSN_ITEM = 'fsnLifeItem';
    Const.SENSORYTEM_URL = 'getSensorytemLifeList';                                            //체감온도
    Const.SENSORYTEM_ITEM = 'sensorytemLifeItem';
    Const.HEAT_URL = 'getHeatLifeList';                                                              //열지수
    Const.HEAT_ITEM = 'heatLifeItem'
    Const.DSPIS_URL= 'getDsplsLifeList';                                                          //불쾌지수
    Const.DSPIS_ITEM = 'dspIsLifeItem';
    Const.WINTER_URL = 'getWinterLifeList' ;                                                     //동파지수
    Const.WINTER_ITEM = 'winterLifeItem';
    Const.ULTRV_URL = 'getUltrvLifeList';                                                       //자외선 지수
    Const.ULTRV_ITEM = 'ultrvLifeItem';
    Const.AIRPOLLUTION_URL = 'getAirpollutionLifeList' ;                                        //대기확산 지수
    Const.AIRPOLLUTION_ITEM = 'airpollutionLifeItem'

    //EarthQuake
    Const.EARTHQAUKE_BASE_URL = 'http://newsky2.kma.go.kr/service/ErthqkInfoService/';
    Const.EARTHQUAKE_REPORT_URL= 'EarthquakeReport';
    Const.EARTHQUAKE_REPORT_LIST_URL = 'EarthquakeReportList';

    //ThunderStroke
    Const.THUNDERSTROKE_BASE_URL = 'http://openapi.kepco.co.kr/service/lightningInfoService/';
    Const.THUNDERSTROKE_INFO_URL= 'getLightningSearchList';


    //식중독 지수 설명
    Const.FSN_VALUE_VERY_HIGH = '▶ 식중독 발생가능성이 매우 높으므로 식중독 예방에 각별한 경계가 요망됨 \n' +
        '▶ 설사, 구토 등 식중독 의심 증상이 있으면 의료기관을 방문하여 의사 지시에 따름 \n' +
        '▶ 식중독 의심 환자는 식품 조리 참여에 즉시 중단하여야 함';
    Const.FSN_VALUE_HIGH = '▶ 식중독 발생가능성이 높으므로 식중독 예방에 경계가 요망됨 \n' +
        '▶ 조리도구는 세척, 소독 등을 거쳐 세균오염을 방지하고 유통기한, 보관방법 등을 \n' +
        '    확인하여 음식물 조리. 보관에 각별히 주의하여야 함';
    Const.FSN_VALUE_NORMAL = '▶ 식중독 발생가능성이 중간 단계이므로 식중독예방에 주의가 요망됨\n' +
        '▶ 조리음식은 중심부까지 75℃(어패류 85℃)로 1분 이상 완전히 익히고 외부로 \n' +
        '    운반할 때에는 가급적 아이스박스 등을 이용하여 10℃이하에서 보관 및 운반';
    Const.FSN_VALUE_GOOD = '▶ 식중독 발생가능성은 낮으나 식중독 예방에 지속적인 관심이 요망됨\n' +
        '▶ 화장실 사용 후, 귀가 후, 조리 전에 손 씻기를 생활화';



    // Exports ----------------------------------------------
    module["exports"] = Const;
    //module["exports"] = TestData;

})((this || 0).self || global);
