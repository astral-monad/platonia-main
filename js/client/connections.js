import {SEND_REQUEST, DECLINE_REQUEST, ACCEPT_REQUEST} from './urls';
import {getAccessToken} from './utils';

export const sendRequest = async request => {
    const body = JSON.stringify(request);

    let response = await fetch(SEND_REQUEST, {
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

export const acceptRequest = async request => {
    const body = JSON.stringify(request);

    let response = await fetch(ACCEPT_REQUEST, {
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

export const declineRequest = async request => {
    const body = JSON.stringify(request);

    let response = await fetch(DECLINE_REQUEST, {
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
