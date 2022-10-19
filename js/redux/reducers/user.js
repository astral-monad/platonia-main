import {
    LOGIN_SUCCESSFUL,
    LOGOUT_SUCCESSFUL,
    UPDATE_PROFILE,
} from '../actions/actionTypes';

const user = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESSFUL:
            return action.data;

        case LOGOUT_SUCCESSFUL:
            return action.data;

        case UPDATE_PROFILE:
            return {
                ...state,
                profile: action.data,
            };
        default:
            return state;
    }
};

export default user;
