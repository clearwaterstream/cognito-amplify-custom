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

        Auth.signOut();
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

            Hub.dispatch(Channels.customAuth, 
            { 
                event: 'signed_in', 
                data: {}, 
                message: '' 
            });

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

    signUp(userInfo) {
        try
        {
            Auth.signUp({
                username: userInfo.username,
                password: userInfo.password,
                attributes: {
                    email: userInfo.email,
                    given_name: userInfo.firstName,
                    family_name: userInfo.lastName,
                    phone_number: '+14165671572' //userInfo.phone
                },
                validationData: []  //optional
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log('hello ' + err);
            });
        }
        catch(err) {
            console.log(err);
        }
    }
}

const instance = new AuthClient();

export { instance as AuthClient }