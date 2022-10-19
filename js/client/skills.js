import {FETCH_SKILL_SUGGESTION, FOLLOW_SKILLS, SKILLS_FOLLOWED} from './urls';
import {getAccessToken} from './utils';

export const fetchSkillSuggestions = async () => {
    let response = await fetch(FETCH_SKILL_SUGGESTION, {
        headers: {
            Authorization: getAccessToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    return await response.json();
};

export const followSkills = async skills => {
    const body = JSON.stringify({
        data: skills,
    });

    let response = await fetch(FOLLOW_SKILLS, {
        headers: {
            Authorization: getAccessToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: body,
    });

    return await response.json();
};

export const fetchSkillsFollowed = async () => {
    let response = await fetch(SKILLS_FOLLOWED, {
        headers: {
            Authorization: getAccessToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    return await response.json();
};
