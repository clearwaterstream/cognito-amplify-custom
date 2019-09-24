import Amplify, { Auth } from 'aws-amplify';
import { StringUtil } from 'Util/Helpers';

class AuthClient
{
    static init()
    {
        Amplify.configure({
            Auth: {
                region: 'ca-central-1',
                userPoolId: process.env.REACT_APP_COGNITO_userPoolId,
                userPoolWebClientId: process.env.REACT_APP_COGNITO_userPoolWebClientId,
                mandatorySignIn: true,
                authenticationFlowType: 'USER_SRP_AUTH'
            }
        });
        
        AuthClient.currentConfig = Auth.configure();
    }
    
    async signIn(username, password) {
        if(StringUtil.isNullOrEmpty(username))
            username = '';
        
        try
        {
            const userInfo = await Auth.signIn(username, password);

            return "ok";
        }
        catch(err) {
            if(StringUtil.isEqual(err.name, "AuthError")) {
                return err.message;
            }

            if(StringUtil.isEqual(err.code, "UnexpectedLambdaException")) {
                if(StringUtil.isNullOrEmpty(password))
                    return "Please enter a password";
            }
            
            if(StringUtil.isEqual(err.code, "NotAuthorizedException")) {
                return err.message;
            }
        }
    }
}

export default AuthClient; // expose the HelloWorld component to other modules