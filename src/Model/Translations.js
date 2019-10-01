import { I18n } from 'aws-amplify';
import AppErrors from 'Model/Translations';

const dict = {
    'fr': {}
};

dict.fr[AppErrors.generic] = '';


class Translations
{
    constructor() {
        I18n.putVocabularies(dict);
    }
}

const instance = new Translations();

export { instance as Translations }