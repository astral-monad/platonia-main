import {
    GET_SUPERPOWERS,
    ADD_SUPERPOWER,
    REMOVE_SUPERPOWER,
    UPDATE_SUPERPOWER,
} from '../actions/actionTypes';

const initailState = [];

const superpowers = (state = initailState, action) => {
    switch (action.type) {
        case GET_SUPERPOWERS:
            return action.data;

        case ADD_SUPERPOWER:
            const allSuperpowers = state;
            const superpower_to_add = action.data;
            const duplicated_superpower = allSuperpowers.find(
                sp => sp.description === superpower_to_add.description,
            );
            if (duplicated_superpower) {
                return state;
            } else {
                return [...state, action.data];
            }

        case REMOVE_SUPERPOWER:
            var pos = state.map(sp => sp.id).indexOf(action.data);

            if (pos >= 0) {
                let newSuperpowerList = state.filter(
                    (val, index) => index !== pos,
                );
                return newSuperpowerList;
            }

            return state;

        case UPDATE_SUPERPOWER:
            var pos = state.map(sp => sp.id).indexOf(action.data.id);

            if (pos >= 0) {
                let newSuperpowerList = [...state];
                newSuperpowerList[pos] = action.data;
                return newSuperpowerList;
            }

            return state;

        default:
            return state;
    }
};

export default superpowers;
