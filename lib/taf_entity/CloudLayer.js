var Enum = require('enum')
require('enum').register();

class CloudLayer
{
    CloudAmount = new Enum(
        ['None', 'FEW', 'SCT', 'BKN', 'OVC', 'VV']
    );
    CloudType = new Enum(
        ['None', 'CB', 'TCU', 'CannotMeasure']
    );
    // Annotation corresponding to amount of clouds (FEW/SCT/BKN/OVC)
    set Amount(ca){
        this._ca = ca;
    }
    get Amount() {
        return this._ca;
    }
    // Height of cloud base
    set BaseHeight(bh)
    {
        this._bh = bh;
    }
    get BaseHeight()
    {
        return this._bh;
    }
    // Cloud type cumulonimbus, towering cumulonimbus (CB/TCU)
    set Type(ct)
    {
        this._ct = ct;
    }
    get Type()
    {
        return this._ct;
    }
}