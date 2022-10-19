import store from '../redux/store';

export const getAccessToken = () => {
    var state = store.getState();
    return state.user.access_token;
};
