var http = require('http')
var parseString = require('xml2js').parseString
var dateFormat = require('dateformat');
var mongodb = require('mongodb');
var XLSX = require('xlsx');
var Taf_Msg = require('./taf_entity/taf_msg.js');

var taf_msg = new Taf_Msg();

var parseTAF = function(data) {
    // 수신된 데이터를 파싱한다.
    var arr = data.split(" ");
    var index = 0;
    // 1. Type of Report: ie.(TAF, TAF AMD)
    if (arr[1] != "AMD") {
        taf_msg.setType(arr[0]);
        index++;
    }else {
        taf_msg.Type(arr[0]+" " + arr[1]);
        index = index + 2;
    }
    // 2. ICAO Station Identifier: ie.(RKSI)
    taf_msg.setICAO_Code(arr(index++));

    // 3. Date and Time of Origin: ie. (051130Z)
    taf_msg.setOrigin_DateTime(arr(index++));

    // 4. Forecast Meteorological Conditions
    // 4.1 Wind: ie.(14008KT)
    
};