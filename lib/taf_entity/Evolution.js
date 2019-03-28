class Evolution
{
    // annotation corresponding to the type of evolution (FM, BECMG or TEMPO)
    set Type(type) {
        this._type = type;
    }
    get Type() {
        return this._type;
    }

    // day when the evolution occurs (FM) or starts (BECMG/TEMPO)
    set FromDay(fd) {
        this._fd = fd;
    }
    get FromDay() {
        return this._fd;
    }
    // hour and minute UTC (as string) when the evolution occurs (FM)
    // or hour UTC (as string) when the evolution starts (BECMG/TEMPO)
    set FromTime(ft) {
        this._ft = ft;
    }
    get FromTime() {
        return this._ft;
    }
    // day when the evolution ends (BECMG/TEMPO)
    set Today(to) {
        this._to = to;
    }
    get Today() {
        return this._to;
    }
    // hour UTC (as string) when the evolution ends (BECMG/TEMPO)
    set ToTime(tt) {
        this._tt = tt;
    }
    get ToTime() {
        return this._tt;
    }

    set Entity(o) {
        this._o = o;
    }
    get Entity() {
        return this._o;
    }
    // weather entity (i.e. SurfaceWind, Temperature, Visibility, etc.)
    set Cavok(ca) {
        this._ca = ca;
    }
    get Cavok() {
        return this._ca;
    }
    // optional annotation corresponding to the probability (PROBnn)
    set Probability(pb) {
        this._pb = pb;
    }
    get Probability() {
        return this._pb;
    }    
}