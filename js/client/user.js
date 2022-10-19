import {
    FB_LOGIN_URL,
    APPLE_LOGIN_URL,
    EMAIL_LOGIN_URL,
    ACCESS_TOKEN_LOGIN_URL,
    UPDATE_PROFILE,
    GET_PROFILE,
} from './urls';

import {getAccessToken} from './utils';

export const updateProfile = async user => {
    const body = JSON.stringify({
        data: user,
    });

    let response = await fetch(UPDATE_PROFILE, {
        headers: {
            Authorization: getAccessToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: body,
    });

    return await response.json();
};

export const loginViaFb = async (fbAccessToken, deviceToken) => {
    const body = JSON.stringify({
        fb_access_token: fbAccessToken,
        latitude: 6.2,
        longitude: 1.3,
        appVersion: 4,
        deviceToken: deviceToken,
        deviceType: 2,
    });

    let response = await fetch(FB_LOGIN_URL, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: body,
    });

    return await response.json();
};

export const loginViaApple = async (token, deviceToken) => {
    const body = JSON.stringify({
        token: token,
        latitude: 6.2,
        longitude: 1.3,
        appVersion: 4,
        deviceToken: deviceToken,
        deviceType: 2,
    });

    let response = await fetch(APPLE_LOGIN_URL, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: body,
    });

    return await response.json();
};

export const loginViaEmail = async (email, password, deviceToken) => {
    const body = JSON.stringify({
        email: email,
        password: password,
        deviceToken: deviceToken,
        latitude: 6.2,
        longitude: 1.3,
        appVersion: 4,
        deviceType: 2,
    });

    let response = await fetch(EMAIL_LOGIN_URL, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: body,
    });

    return await response.json();
};

export const signupViaEmail = async (
    email,
    password,
    username,
    dob,
    deviceToken,
) => {
    const body = JSON.stringify({
        email: email,
        password: password,
        username: username,
        dateOfBirth: dob,
        deviceToken: deviceToken,
        latitude: 6.2,
        longitude: 1.3,
        appVersion: 4,
        deviceType: 2,
    });

    let response = await fetch(EMAIL_LOGIN_URL, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: body,
    });

    return await response.json();
};

export const loginViaAccessToken = async (accessToken, deviceToken) => {
    const body = JSON.stringify({
        deviceToken: deviceToken,
        latitude: 6.2,
        longitude: 1.3,
        appVersion: 4,
        deviceType: 2,
    });

    let response = await fetch(ACCESS_TOKEN_LOGIN_URL, {
        headers: {
            Authorization: accessToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: body,
    });

    return await response.json();
};

export const getProfile = async id => {
    let response = await fetch(GET_PROFILE + '/' + id, {
        headers: {
            Authorization: getAccessToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    return await response.json();
};
