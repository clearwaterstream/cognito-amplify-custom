import Amplify, { Auth } from 'aws-amplify';
import { StringUtil } from 'Util/Helpers';
import { Hub } from 'aws-amplify';

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

        Hub.listen('CustomAuth', (data) => {
            const { payload } = data;

            this._handleEvent(payload);
        });
    }

    start() { } // does nothing

    _handleEvent(payload) {
        const event = payload.event;

        if(StringUtil.isEqual('init', event)) {
            this._onInit(payload);
            
            return;
        }
    }

    _onInit(payload) {
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