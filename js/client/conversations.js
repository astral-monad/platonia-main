import {GET_CONVERSATIONS, GET_CONVERSATION} from './urls';
import {getAccessToken} from './utils';

export const fetchConversations = async () => {
    let response = await fetch(GET_CONVERSATIONS, {
        headers: {
            Authorization: getAccessToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    return await response.json();
};

export const fetchConversation = async conversationId => {
    let response = await fetch(GET_CONVERSATION + '?id=' + conversationId, {
        headers: {
            Authorization: getAccessToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    return await response.json();
};
