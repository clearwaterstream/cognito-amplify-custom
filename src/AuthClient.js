import Amplify, { Auth } from 'aws-amplify';
import { StringUtil } from 'Util/Helpers';

class AuthClient
{
    async signIn(username, password) {
        try
        {
            const userInfo = await Auth.signIn('igor', '1234567');

            return userInfo;
        }
        catch(err) {
            if(StringUtil.isEqual(err.code, "NotAuthorizedException")) {
                
            }
        }
    }
}

export default AuthClient; // expose the HelloWorld component to other modules