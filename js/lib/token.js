import {AccessToken} from 'react-native-fbsdk';

export const getFBAccessToken = async () => {
    return await AccessToken.getCurrentAccessToken();
};

export const getDeviceToken = async () => {
    return Promise.resolve('dummy_token');
};
