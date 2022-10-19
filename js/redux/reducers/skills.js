import {FOLLOW_SKILLS, SKILLS_FOLLOWED} from '../actions/actionTypes';

const initailState = {skillsFollowed: []};

const skills = (state = initailState, action) => {
    switch (action.type) {
        //Changes required here, no need for follow skills, use fetch skills
        case FOLLOW_SKILLS:
            return {
                ...state,
                skillsFollowed: [...state.skillsFollowed, ...action.data],
            };

        case SKILLS_FOLLOWED:
            return {
                ...state,
                skillsFollowed: action.data,
            };
        default:
            return state;
    }
};

export default skills;
