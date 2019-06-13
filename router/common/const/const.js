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

    //Alert
    Const.WEATHERLIFE_RANGE_DANGER = "위험";
    Const.WEATHERLIFE_RANGE_VERY_HIGH = "매우높음";
    Const.WEATHERLIFE_RANGE_HIGH = "높음";
    Const.WEATHERLIFE_RANGE_NORMAL = "보통";
    Const.WEATHERLIFE_RANGE_LOW = "관심";

    //WeeklyWeather
    Const.WEEKLYWEATHER_BASE_URL = 'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/';
    Const.FORECAST_SPACE_URL = 'ForecastSpaceData';                                                                         //동네예보
    Const.FORECAST_SPACE_ITEM = 'forecastSpace';

    //http://newsky2.kma.go.kr/service/MiddleFrcstInfoService/getMiddleForecast?ServiceKey=Xi4VvLiWg3OmKvVVmaMucjfxbBB4AlGLaMK48fH2Icm%2BfJXiez2UaCkO%2Bb6y%2BK9pBlet%2BDzUWqMkjXYkPL2qaQ%3D%3D&stnId=133&tmFc=201404080600&pageNo=1&numOfRows=1
    Const.MID_BASE_URL = 'http://newsky2.kma.go.kr/service/MiddleFrcstInfoService/';                                         //중기 예보 베이스 URL
    Const.MID_TEMP_URL = 'getMiddleTemperature';
    Const.MID_TEMP_ITEM = 'middleTemperature';
    Const.MID_LAND_URL = 'getMiddleLandWeather';
    Const.MID_LAND_ITEM = 'middleForecast';
    Const.MID_FORECAST_URL = 'getMiddleForecast';
    Const.MID_FORECAST_ITEM = 'middleForecast';


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

    //체감온도
    Const.SENSORYTEM_VALUE_DANGER = '▶ 장시간 야외 활동 시 저체온증과 더불어 동상의 위험이 있음\n' +
        '▶ 실내에 머무르며, 야외에 있을 경우 지속적으로 몸을 움직이도록 함\n' +
        '▶ 피부가 바람에 직접 노출되지 않도록 함\n' +
        '▶ 방풍기능이 있는 겉옷을 입고, 안에 겹겹이 옷을 입어야 함\n' +
        '▶ 모자, 벙어리장갑, 목도리, 마스크, 방수 신발 등을 착용함\n' +
        '▶ 야외 작업 시 땀 흡수가 잘 되는 내복을 입도록 함\n' +
        '▶ 옷이나 신발 등이 젖지 않도록 하고, 젖은 즉시 갈아입음\n' +
        '▶ 어린이의 경우 건강위험이 우려되어 장시간 외출 자제';
    Const.SENSORYTEM_VALUE_ALERT = '▶ 노출된 피부에는 매우 찬 기운이 느껴짐\n' +
        '▶ 방한용품 없이 장기간 피부 노출 시 저체온증의 위험이 있음\n' +
        '▶ 야외에 있을 경우 지속적으로 몸을 움직이도록 함\n' +
        '▶ 방풍기능이 있는 겉옷을 입고, 안에 겹겹이 옷을 입어야 함\n' +
        '▶ 모자, 벙어리 장갑, 목도리, 방수 신발 등을 착용함\n' +
        '▶ 야외 작업 시 땀 흡수가 잘 되는 내복을 입도록 함\n' +
        '▶ 옷이나 신발 등이 젖지 않도록 하고, 젖은 즉시 갈아입음';
    Const.SENSORYTEM_VALUE_WARN = '▶ 추위를 느끼는 정도가 증가함\n' +
        '▶ 옷을 따뜻하게 입고 모자, 장갑, 목도리 등을 착용함\n' +
        '▶ 옷이나 신발 등이 젖지 않도록 함';
    Const.SENSORYTEM_VALUE_CAUTION = '▶ 추위가 느껴지기 시작함\n' +
        '▶ 옷을 따뜻하게 입음\n' +
        '▶ 옷이나 신발 등이 젖지 않도록 함'


    //열지수
    Const.HEAT_VALUE_DANGER = '▶ 가급적 야외 활동 및 작업을 중지하고, 부득이한 경우 야외활동 시 자신의 \n' +
        '    건강 상태를 살피며 활동의 강도를 조절하고 두통, 어지러움, 근육경련, \n' +
        '    의식저하 등의 증상이 있으면 그늘이나 서늘한 실내에서 휴식을 취함';
    Const.HEAT_VALUE_VERY_HIGH = '▶ 가급적 야외 활동 및 작업을 중지하고, 부득이한 경우 야외활동 시 자신의 \n' +
        '    건강 상태를 살피며 활동의 강도를 조절하고 두통, 어지러움, 근육경련, \n' +
        '    의식저하 등의 증상이 있으면 그늘이나 서늘한 실내에서 휴식을 취함';
    Const.HEAT_VALUE_HIGH = '▶ 열사병, 열경련 가능성이 높아지므로 낮 12시～오후 5시 사이에는 \n' +
        '    야외 활동 및 작업을 자제하고 햇볕을 차단\n' +
        '▶ 주·정차된 차에 어린이나 동물을 혼자 두지 않도록 주의';
    Const.HEAT_VALUE_NORMAL = '▶ 열사병, 열경련 가능성이 있으므로 야외 활동 및 작업에 주의하고, 적극적 \n' +
        '    수분 섭취 필요\n' +
        '▶ 땀을 많이 흘렸을 경우 염분과 미네랄 보충하기\n' +
        '▶ 면소재의 헐렁하고 가벼운 옷 입기\n' +
        '▶ 창문과 문이 닫힌 상태에서 선풍기를 틀지 않도록 주의';
    Const.HEAT_VALUE_LOW = '▶ 일반적으로 위험은 낮으나 수분섭취 등 건강관리에 유의';

    //불쾌지수
    Const.DSPIS_VALUE_VERY_HIGH = '▶ 전원 불쾌감을 느낌\n' +
        '▶ 어린이, 노약자 등 더위에 취약한 사람들은 야외활동을 자제함\n' +
        '▶ 에어컨, 제습기, 실내 환기 등을 통해 실내 온습도를 조절하거나 무더위쉼터 \n' +
        '   등으로 이동하여 휴식\n' +
        '▶ 수분을 미리 충분히 섭취';
    Const.DSPIS_VALUE_HIGH = '▶ 50% 정도 불쾌감을 느낌\n' +
        '▶ 어린이, 노약자 등 더위에 취약한 사람들은 12시~5시 사이에는 야외활동을 \n' +
        '   자제하거나 가벼운 옷을 입기\n' +
        '▶ 에어컨, 제습기, 실내 환기 등을 통해 실내 온습도를 조절함\n' +
        '▶ 지속적으로 수분을 섭취함';
    Const.DSPIS_VALUE_NORMAL = '▶ 불쾌감을 나타내기 시작함\n' +
        '▶ 어린이, 노약자 등 더위에 취약한 사람들은 야외활동을 시 가벼운 옷을 입기\n' +
        '▶ 수분을 충분히 섭취함';
    Const.DSPIS_LOW = '▶ 전원 쾌적함을 느낌';

    //동파 지수

    //자외선 지수

    //대기오염확산지수


    // Exports ----------------------------------------------
    module["exports"] = Const;
    //module["exports"] = TestData;

})((this || 0).self || global);
