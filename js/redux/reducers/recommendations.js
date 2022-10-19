import {
    FETCH_RECOMMENDATIONS,
    SEND_REQUEST,
    DECLINE_REQUEST,
    ACCEPT_REQUEST,
} from '../actions/actionTypes';

const initailState = [];

const skills = (state = initailState, action) => {
    switch (action.type) {
        case FETCH_RECOMMENDATIONS:
            return action.data;

        case SEND_REQUEST:
            //Set sent request data in recommendations user
            return state;

        case ACCEPT_REQUEST:
            //Set accepted request data in recommendations user
            return state;

        case DECLINE_REQUEST:
            //Set decline request data in recommendations user
            return state;

        default:
            return state;
    }
};

export default skills;
