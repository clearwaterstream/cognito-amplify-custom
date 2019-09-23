/* IGOR KRUPIN */

class StringUtil
{
    static isEqual(text, other)
    {
        if(this.isNullOrEmpty(text) && this.isNullOrEmpty(other))
            return true;

        if((typeof text === 'string' || text instanceof String) && (typeof other === 'string' || other instanceof String))
        {
            const r = text.localeCompare(other, undefined, { sensitivity: 'base' });

            return r === 0;
        }
        
        return false;
    }

    static isNullOrEmpty(text)
    {
        if(text === undefined)
            return true;

        if(text === null)
            return true;

        if(text === '')
            return true;
    }
}

export {StringUtil};