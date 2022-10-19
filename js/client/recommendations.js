import {FETCH_RECOMMENDATIONS, SEARCH} from './urls';
import {getAccessToken} from './utils';

export const fetchRecommendations = async () => {
    let response = await fetch(FETCH_RECOMMENDATIONS, {
        headers: {
            Authorization: getAccessToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    return await response.json();
};

export const fetchedSearchedRecommendations = async searchText => {
    let response = await fetch(SEARCH + '?searchTerm=' + searchText, {
        headers: {
            Authorization: getAccessToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    return await response.json();
};
