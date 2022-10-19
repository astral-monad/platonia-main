import {combineReducers} from 'redux';
import user from './user';
import superpowers from './superpowers';
import skills from './skills';
import recommendations from './recommendations';

const rootReducer = combineReducers({
    user,
    superpowers,
    skills,
    recommendations,
});

export default rootReducer;
