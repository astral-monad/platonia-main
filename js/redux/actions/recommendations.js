import {FETCH_RECOMMENDATIONS} from './actionTypes';

import * as recommendationsClient from '../../client/recommendations';

export const recommendationsFetched = recommendations => {
    return {
        type: FETCH_RECOMMENDATIONS,
        data: recommendations,
    };
};

export const fetchRecommendations = ({onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            let response = await recommendationsClient.fetchRecommendations();
            let recommendations = response.data || [];
            dispatch(recommendationsFetched(recommendations));
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
