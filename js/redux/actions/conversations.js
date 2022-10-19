import {GET_CONVERSATIONS, GET_CONVERSATION} from './actionTypes';

import * as conversationClient from '../../client/conversations';

export const conversationsFetched = () => {
    return {
        type: GET_CONVERSATIONS,
    };
};

export const conversationFetched = () => {
    return {
        type: GET_CONVERSATION,
    };
};

export const fetchConversations = ({onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            let response = await conversationClient.fetchConversations();
            let conversations = response.data || [];
            dispatch(conversationsFetched());
            if (onSuccess) {
                return onSuccess(conversations);
            }
        } catch (e) {
            if (onFailure) {
                return onFailure(e);
            }
        }
    };
};

export const fetchConversation = (conversationId, {onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            let response = await conversationClient.fetchConversation(
                conversationId,
            );
            let conversation = response.data || [];
            dispatch(conversationFetched());
            if (onSuccess) {
                return onSuccess(conversation);
            }
        } catch (e) {
            if (onFailure) {
                return onFailure(e);
            }
        }
    };
};
