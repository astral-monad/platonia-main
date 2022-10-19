import {
    GET_SUPERPOWERS,
    ADD_SUPERPOWER,
    REMOVE_SUPERPOWER,
    UPDATE_SUPERPOWER,
    FETCH_SUPERPOWER_SUGGESTION,
} from './urls';
import {getAccessToken} from './utils';

export const getSuperpowers = async () => {
    let response = await fetch(GET_SUPERPOWERS, {
        headers: {
            Authorization: getAccessToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    return await response.json();
};

export const addSuperpower = async superpower => {
    const body = JSON.stringify({data: superpower});

    let response = await fetch(ADD_SUPERPOWER, {
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

export const deleteSuperpower = async superPowerID => {
    const body = JSON.stringify({superpowerId: superPowerID});

    let response = await fetch(REMOVE_SUPERPOWER, {
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

export const updateSuperpower = async superpower => {
    const body = JSON.stringify({data: superpower});

    let response = await fetch(UPDATE_SUPERPOWER, {
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

export const fetchSuperpowerSuggestions = async () => {
    let response = await fetch(FETCH_SUPERPOWER_SUGGESTION, {
        headers: {
            Authorization: getAccessToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    return await response.json();
};
