function Taf_Msg()
{
    this._type = "";
    this._icao_code = "";
    this._origin_dt = "";
    this._valid_dt = "";
    this._wind = "";
};

var proto = Taf_Msg.prototype;

// TAF, TAF AMD
proto.setType = function(type) {
    this._type = type;
};
proto.getType = function() {
    return this._type;
};

// ICAO code
proto.setICAO_Code = function(icao_code) {
    this._icao_code = icao_code;
};
proto.getICAO_Code = function() {
    return this._icao_code;
};

// Date and Time of Origin
proto.setOriginDateTime = function(dt) {
    this._origin_dt = dt;
};
proto.getOriginDateTime = function() {
    return this._origin_dt;
};

// Valid Period Date and Time: ie.(051212)
proto.setValidDateTime = function(dt) {
    this._valid_dt = dt;
};
proto.getValidDateTime = function() {
    return this._valid_dt;
};

// Forecast Meteorological Conditions
// Wind: ie.(14008KT)
proto.setWind = function(w)
{
    this._wind = w;
};
proto.getWind = function() {
    return this._wind;
};

module.exports = Taf_Msg;