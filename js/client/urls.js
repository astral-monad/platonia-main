const SCHEME = 'https';
const HOST_DEV = 'localhost';
const HOST_PROD = 'api.platonia.network';
const PORT = 8012;

// const HOST_URL = SCHEME + '://' + HOST_DEV + ':' + PORT;
const HOST_URL = SCHEME + '://' + HOST_PROD;

//Login
export const FB_LOGIN_URL = HOST_URL + '/auth/facebook';
export const APPLE_LOGIN_URL = HOST_URL + '/auth/apple';
export const EMAIL_LOGIN_URL = HOST_URL + '/auth/email';
export const ACCESS_TOKEN_LOGIN_URL = HOST_URL + '/auth/token';

//Superpower
export const GET_SUPERPOWERS = HOST_URL + '/superpower/me';
export const ADD_SUPERPOWER = HOST_URL + '/superpower/add';
export const UPDATE_SUPERPOWER = HOST_URL + '/superpower/update';
export const REMOVE_SUPERPOWER = HOST_URL + '/superpower/remove';
export const FETCH_SUPERPOWER_SUGGESTION = HOST_URL + '/skill/categories';

//Skill
export const FETCH_SKILL_SUGGESTION = HOST_URL + '/skill/trending';
export const FOLLOW_SKILLS = HOST_URL + '/skill/follow';
export const SKILLS_FOLLOWED = HOST_URL + '/skill/following';

//Profile
export const UPDATE_PROFILE = HOST_URL + '/user/update_profile';
export const GET_PROFILE = HOST_URL + '/user/profile';

//Recommendations
export const FETCH_RECOMMENDATIONS = HOST_URL + '/search/recommendations';
export const SEARCH = HOST_URL + '/search/terms';

//Requests
export const SEND_REQUEST = HOST_URL + '/connection/sendRequest';
export const ACCEPT_REQUEST = HOST_URL + '/connection/acceptRequest';
export const DECLINE_REQUEST = HOST_URL + '/connection/declineRequest';

//Conversations
export const GET_CONVERSATIONS = HOST_URL + '/conversation/get_conversations';
export const GET_CONVERSATION = HOST_URL + '/conversation/get_conversation';
