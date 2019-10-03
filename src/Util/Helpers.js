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

    static isEither(text, ...args) {
        if(this.isNullOrEmpty(text)) {
            return false;
        }
        
        if(args === null || typeof args === typeof undefined) {
            return false;
        }

        for(var v of args) {
            if(this.isEqual(text, v)) {
                return true;
            }
        }

        return false;
    }

    static contains(text, other) {
        if(this.isNullOrEmpty(text))
            return false;

        if((typeof text === 'string' || text instanceof String) && (typeof other === 'string' || other instanceof String))
        {
            const r = text.toLowerCase().includes(other.toLowerCase());

            return r;
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

    static extractDigits(text) {
        if (this.isNullOrEmpty(text)) {
            return text;
          }
        
        const cleanValue = text.replace(/[^\d]/g, "");

        return cleanValue;
    }
}

export {StringUtil};