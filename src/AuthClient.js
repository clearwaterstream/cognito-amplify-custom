import Amplify, { Auth } from 'aws-amplify';
import { StringUtil } from 'Util/Helpers';
import { Hub } from 'aws-amplify';
import Channels from 'Model/Events/Channels';

class AuthClient
{
    constructor()
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
        
        this.currentConfig = Auth.configure();
    }

    start() { } // does nothing

    async getSessionStatus()
    {
        let status = '';

        try {
            const session = await Auth.currentSession();

            status = 'sessionExists';
        }
        catch(err) {
            status = 'needToSignIn';
        }

        return status;
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

const instance = new AuthClient();

export { instance as AuthClient }