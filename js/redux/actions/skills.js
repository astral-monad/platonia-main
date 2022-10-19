import {
    FETCH_SKILLS_SUGGESTIONS,
    FOLLOW_SKILLS,
    SKILLS_FOLLOWED,
} from './actionTypes';

import * as skillsClient from '../../client/skills';

export const skillsSuggestionFetched = () => {
    return {
        type: FETCH_SKILLS_SUGGESTIONS,
    };
};

export const skillFollowed = skills => {
    return {
        type: FOLLOW_SKILLS,
        data: skills,
    };
};

export const skillsFollowed = skills => {
    return {
        type: SKILLS_FOLLOWED,
        data: skills,
    };
};

export const fetchSkillSuggestions = ({onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            let response = await skillsClient.fetchSkillSuggestions();
            dispatch(skillsSuggestionFetched());
            if (onSuccess) {
                return onSuccess(response);
            }
        } catch (e) {
            if (onFailure) {
                return onFailure();
            }
        }
    };
};

export const followSkills = (skills, {onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            let response = await skillsClient.followSkills(skills);
            let updatedSkills = response.data.updatedSkillsWithCount || [];
            dispatch(skillFollowed(updatedSkills));
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

export const fetchSkillsFollowed = ({onSuccess, onFailure}) => {
    return async dispatch => {
        try {
            let response = await skillsClient.fetchSkillsFollowed();
            let skills = response.data || [];
            dispatch(skillsFollowed(skills));
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
