import {
    GET_SUPERPOWERS,
    ADD_SUPERPOWER,
    REMOVE_SUPERPOWER,
    UPDATE_SUPERPOWER,
} from './actionTypes';

import * as superpowerClient from '../../client/superpower';
import superpowers from '../reducers/superpowers';

export const fetchedSuperpowers = superpowers => {
    return {
        type: GET_SUPERPOWERS,
        data: superpowers,
    };
};

export const addedSuperpower = superpower => {
    return {
        type: ADD_SUPERPOWER,
        data: superpower,
    };
};

export const removedSuperpower = superpowerID => {
    return {
        type: REMOVE_SUPERPOWER,
        data: superpowerID,
    };
};

export const updatedSuperpower = superpower => {
    return {
        type: UPDATE_SUPERPOWER,
        data: superpower,
    };
};

export const getSuperpowers = ({onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            let response = await superpowerClient.getSuperpowers();
            let superpowers = response.data || [];
            dispatch(fetchedSuperpowers(superpowers));
            if (onSuccess) {
                return onSuccess(superpowers);
            }
        } catch (e) {
            if (onFailure) {
                return onFailure();
            }
        }
    };
};

export const addSuperpower = (
    description,
    superpowerTags,
    learntFrom = '',
    {onSuccess, onFailure},
) => {
    return async dispatch => {
        try {
            let response = await superpowerClient.addSuperpower([
                {description, superpowerTags, learntFrom},
            ]);
            let superpower = response.data.superpowers?.[0] || {};
            dispatch(addedSuperpower(superpower));
            if (onSuccess) {
                return onSuccess(superpower);
            }
        } catch (e) {
            if (onFailure) {
                return onFailure();
            }
        }
    };
};

export const removeSuperpower = (superpowerID, {onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            await superpowerClient.deleteSuperpower(superpowerID);
            dispatch(removedSuperpower(superpowerID));
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

export const updateSuperpower = (
    id,
    description,
    superpowerTags,
    learntFrom,
    {onSuccess, onFailure},
) => {
    return async dispatch => {
        try {
            let response = await superpowerClient.updateSuperpower([
                {id, description, superpowerTags, learntFrom},
            ]);
            let superpower = response.data.superpowers?.[0] || {};
            dispatch(updatedSuperpower(superpower));
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

export const updateSuperpowers = (
    superpowersToUpdate,
    {onSuccess, onFailure},
) => {
    return async dispatch => {
        try {
            let response = await superpowerClient.updateSuperpower(
                superpowersToUpdate,
            );
            let updatedSuperpowers = response.data.superpowers || [];
            for (let i = 0; i < updatedSuperpowers.length; i++) {
                let superpower = updatedSuperpowers[i];
                dispatch(updatedSuperpower(superpower));
            }

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
