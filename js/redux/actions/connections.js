import {SEND_REQUEST, DECLINE_REQUEST, ACCEPT_REQUEST} from './actionTypes';

import * as requestClient from '../../client/connections';

export const requestSent = request => {
    return {
        type: SEND_REQUEST,
        data: request,
    };
};

export const requestAccepted = request => {
    return {
        type: ACCEPT_REQUEST,
        data: request,
    };
};

export const requestDeclined = request => {
    return {
        type: DECLINE_REQUEST,
        data: request,
    };
};

export const sendRequest = (request, {onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            let response = await requestClient.sendRequest(request);
            dispatch(requestSent(response));
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

export const acceptRequest = (request, {onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            let response = await requestClient.acceptRequest(request);
            dispatch(requestAccepted(response));
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

export const declineRequest = (request, {onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            let response = await requestClient.declineRequest(request);
            dispatch(requestDeclined(response));
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
