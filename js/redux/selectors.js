import store from './store';

export const getSuperPowers = () => {
    var state = store.getState();
    return state.superpowers;
};

export const getUser = () => {
    var state = store.getState();
    return state.user;
};
