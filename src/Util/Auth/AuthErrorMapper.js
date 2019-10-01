import { StringUtil } from 'Util/Helpers';
import { I18n } from 'aws-amplify';
import AppErrors from 'Model/AppErrors';

class AuthErrorMapper
{
    constructor() {
    }
    
    mapError(err) {
        let friendlyError = I18n.get(AppErrors.generic);
        
        if(StringUtil.isNullOrEmpty(err)) {
            return friendlyError;
        }

        if(StringUtil.isEqual(err.name, "AuthError")) {
            return err.message; // use the error from the lib
        }
        else if(StringUtil.isEqual(err.name, "InvalidParameterException")) {
            const errMsg = err.message;

            if(StringUtil.contains(errMsg, "Value at 'password' failed")) {
                friendlyError = I18n.get(AppErrors.auth_weak_password);

                return friendlyError;
            }
        }

        return friendlyError;
    }
}

const instance = new AuthErrorMapper();

export { instance as AuthErrorMapper }