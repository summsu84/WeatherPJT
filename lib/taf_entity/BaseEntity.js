
class AbstractEntity
{
    // An evolution can contain embedded evolutions with different probabilities
    set Evolutions(lst)
    {
        if (this._lst == undefined)
        {
            this._lst = new ArrayList;
        }
        this._lst.add(lst);
    }
    get Evolutions()
    {
        if (this._lst == undefined)
        {
            this._lst = new ArrayList;
        }
        return this._lst;
    }
}