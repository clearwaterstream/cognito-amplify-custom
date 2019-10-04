import { StringUtil } from 'Util/Helpers';
import { I18n } from 'aws-amplify';
import AppErrors from 'Model/AppErrors';

class AuthErrorMapper
{
    errorMapByMsg = {};
    
    constructor() {
        this.errorMapByMsg["Attribute value for given_name must not be null"] = AppErrors.first_name_empty;
        this.errorMapByMsg["Attribute value for family_name must not be null"] = AppErrors.last_name_empty;
        this.errorMapByMsg["Attribute value for email must not be null"] = AppErrors.email_empty;
        this.errorMapByMsg["Attributes did not conform to the schema: phone_number: The attribute is required"] = AppErrors.phone_empty;
        this.errorMapByMsg["Attribute value for phone_number must not be null"] = AppErrors.phone_empty;
        this.errorMapByMsg["Invalid phone number format."] = AppErrors.phone_invalid_format;
        this.errorMapByMsg["Invalid email address format."] = AppErrors.email_invalid_format;
    }
    
    mapError(err) {
        let friendlyError = I18n.get(AppErrors.generic);
        
        if(StringUtil.isNullOrEmpty(err)) {
            return friendlyError;
        }

        if(StringUtil.isEither(err.name, "AuthError", "UsernameExistsException")) {
            return err.message; // use the error from the lib
        }
        else if(StringUtil.isEqual(err.name, "InvalidParameterException")) {
            let errMsg = err.message;

            if(!StringUtil.isNullOrEmpty(errMsg)) {
                errMsg = errMsg.trimEnd();
            }

            let betterErrorMsg;

            if(StringUtil.contains(errMsg, "Value at 'username' failed to satisfy constraint")) {
                betterErrorMsg = AppErrors.auth_weak_password;
            }
            else if(StringUtil.contains(errMsg, "Value at 'password' failed to satisfy constraint")) {
                betterErrorMsg = AppErrors.auth_weak_password;
            }

            if(StringUtil.isNullOrEmpty(betterErrorMsg)) {                
                betterErrorMsg = this.errorMapByMsg[errMsg];
            }

            if(StringUtil.isNullOrEmpty(betterErrorMsg)) {
                return friendlyError;
            }
            
            friendlyError = I18n.get(betterErrorMsg);

            return friendlyError;
        }

        return friendlyError;
    }
}

const instance = new AuthErrorMapper();

export { instance as AuthErrorMapper }