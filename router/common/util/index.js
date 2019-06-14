/**
 * Created by JJW on 2019-06-14.
 */
'use strict';
const ParsingModule = require('./parsing');
const UrlModule = require('./url');

module.exports = {
    'parsingResultOfMiddleForecastInfo': (type, body, onSuccess, onError) => {
        ParsingModule.parsingResultOfMiddleForecastInfo(type, body, onSuccess, onError);
    },
    'parsingResultOfMiddleForecastISpaceNew': (type, body, onSuccess, onError) => {
        ParsingModule.parsingResultOfMiddleForecastISpaceNew(type, body, onSuccess, onError);
    },
    'getRequestUrl': (params, baseUrl, serviceUrl, serviceKey) => {
        return UrlModule.getRequestUrl(params, baseUrl, serviceUrl, serviceKey);
    },
    'getMiddleForecastLandUrl': (params, baseUrl, serviceUrl, serviceKey) => {
        return UrlModule.getMiddleForecastLandUrl(params, baseUrl, serviceUrl, serviceKey);
    },
    'getMiddleForecastTempUrl': (params, baseUrl, serviceUrl, serviceKey) => {
        return UrlModule.getMiddleForecastTempUrl(params, baseUrl, serviceUrl, serviceKey);
    },
    'getMiddleForecastUrl': (params, baseUrl, serviceUrl, serviceKey) => {
        return UrlModule.getMiddleForecastUrl(params, baseUrl, serviceUrl, serviceKey);
    },
};