import {
    LOGIN_START,
    LOGIN_SUCCESSFUL,
    LOGOUT_SUCCESSFUL,
    UPDATE_PROFILE,
    GET_PROFILE,
} from './actionTypes';
import {getFBAccessToken, getDeviceToken} from '../../lib/token';

import * as userClient from '../../client/user';
import AsyncStorage from '@react-native-community/async-storage';

import store from '../store';

export const profileUpdated = user => {
    return {
        type: UPDATE_PROFILE,
        data: user,
    };
};

export const profileFetched = () => {
    return {
        type: GET_PROFILE,
    };
};

export const startLogin = () => {
    return {
        type: LOGIN_START,
    };
};

export const loginSuccessful = data => {
    return {
        type: LOGIN_SUCCESSFUL,
        data,
    };
};

export const logoutSuccessful = (data = {}) => {
    return {
        type: LOGOUT_SUCCESSFUL,
        data,
    };
};

export const getProfile = (id, {onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            let response = await userClient.getProfile(id);
            let profile = response.data;
            dispatch(profileFetched(profile));
            if (onSuccess) {
                return onSuccess(profile);
            }
        } catch (e) {
            if (onFailure) {
                return onFailure();
            }
        }
    };
};

export const updateProfile = (user, {onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            let response = await userClient.updateProfile(user);
            dispatch(profileUpdated(response.data));
            if (onSuccess) {
                return onSuccess();
            }
        } catch (e) {
            if (onFailure) {
                return onFailure();
            }
        }
    };
};

export const loginViaFB = ({onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            dispatch(startLogin());
            var fbAccessToken = await getFBAccessToken();
            var deviceToken = await getDeviceToken();
            let responseBody = await userClient.loginViaFb(
                fbAccessToken.accessToken,
                deviceToken,
            );
            dispatch(loginSuccessful(responseBody.data));
            let accessToken = responseBody.data.access_token;
            await AsyncStorage.setItem('@accessToken', accessToken);
            onSuccess(responseBody.data);
        } catch (e) {
            onFailure();
        }
    };
};

export const loginViaApple = ({token, onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            dispatch(startLogin());
            var deviceToken = await getDeviceToken();
            let responseBody = await userClient.loginViaApple(
                token,
                deviceToken,
            );
            dispatch(loginSuccessful(responseBody.data));
            let accessToken = responseBody.data.access_token;
            await AsyncStorage.setItem('@accessToken', accessToken);
            onSuccess(responseBody.data);
        } catch (e) {
            onFailure();
        }
    };
};

export const loginViaEmail = (email, password, {onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            dispatch(startLogin());
            var deviceToken = await getDeviceToken();
            let responseBody = await userClient.loginViaEmail(
                email,
                password,
                deviceToken,
            );
            dispatch(loginSuccessful(responseBody.data));
            let accessToken = responseBody.data.access_token;
            if (accessToken) {
                await AsyncStorage.setItem('@accessToken', accessToken);
            }
            onSuccess(responseBody.data);
        } catch (e) {
            onFailure();
        }
    };
};

export const signupViaEmail = (
    email,
    password,
    username,
    dob,
    {onSuccess, onFailure},
) => {
    return async dispatch => {
        try {
            dispatch(startLogin());
            var deviceToken = await getDeviceToken();
            let responseBody = await userClient.signupViaEmail(
                email,
                password,
                username,
                dob,
                deviceToken,
            );
            dispatch(loginSuccessful(responseBody.data));
            let accessToken = responseBody.data.access_token;
            if (accessToken) {
                await AsyncStorage.setItem('@accessToken', accessToken);
            }
            onSuccess(responseBody.data);
        } catch (e) {
            onFailure();
        }
    };
};

export const isLoggedIn = async () => {
    try {
        let accessToken = await AsyncStorage.getItem('@accessToken');

        if (accessToken) {
            store.dispatch(startLogin());
            var deviceToken = await getDeviceToken();
            let responseBody = await userClient.loginViaAccessToken(
                accessToken,
                deviceToken,
            );
            responseBody.data.access_token = accessToken;
            store.dispatch(loginSuccessful(responseBody.data));
            return responseBody.data;
        }

        return null;
    } catch (e) {
        return null;
    }
};

export const logout = ({onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            await AsyncStorage.removeItem('@accessToken');
            dispatch(logoutSuccessful());
            onSuccess();
        } catch (e) {
            onFailure();
        }
    };
};
