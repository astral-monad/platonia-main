import {
    pushScreen,
    goBack,
    goBackToRoot as Root,
    goToMainScreen as MainScreen,
    goToScreen,
} from './index';

export const goBackToRoot = componentId => Root(componentId);

export const goToPrevScreen = componentId => goBack(componentId);

export const goToMainScreen = () => MainScreen();

export const goToLoginScreen = () => goToScreen('Login');

export const goToWelcomeScreen = () => goToScreen('Welcome');

export const goToEmailScreen = componentId =>
    pushScreen(componentId, 'EmailScreen');

export const goToSignUpScreen = componentId =>
    pushScreen(componentId, 'Login.SignUp', {});

export const goToAddSuperpowers = (componentId, passProps = {}) =>
    pushScreen(componentId, 'AddSuperPower', {passProps});

export const goToAddSuperpowersFromProfile = componentId =>
    pushScreen(componentId, 'AddSuperPower', {passProps: {fromProfile: true}});

export const goToAddSuperpowerFromTagPressOverlay = (
    componentId,
    predefinedSuperpower,
) =>
    pushScreen(componentId, 'AddSuperPower', {
        passProps: {
            fromProfile: true,
            predefinedSuperpower: predefinedSuperpower,
        },
    });

export const goToReviewSuperpowerScreen = (componentId, passProps = {}) =>
    pushScreen(componentId, 'ReviewSuperPower', {passProps});

export const goToSuggestSuperpowerScreen = componentId =>
    pushScreen(componentId, 'SuggestSuperPower', {});

export const goToSuggestSuperpowerScreenFromProfile = componentId =>
    pushScreen(componentId, 'SuggestSuperPower', {
        passProps: {fromProfile: true},
    });

export const goToLearnScreen = () => goToScreen('LearnScreen');

export const goToLearnScreenFromProfile = componentId =>
    pushScreen(componentId, 'LearnScreen', {passProps: {fromProfile: true}});

export const goToEditProfile = (componentId, userData) =>
    pushScreen(componentId, 'Profile.EditProfile', {
        passProps: {
            ...userData,
        },
    });

export const goToEditSuperpowers = componentId =>
    pushScreen(componentId, 'Profile.EditSuperpowers', {});

export const goToEditScreen = (componentId, superpower) =>
    pushScreen(componentId, 'Profile.EditSuperpowers.EditScreen', {
        passProps: {superpower},
    });

export const goToInviteFriendsScreen = componentId =>
    pushScreen(componentId, 'Profile.AddFriendsScreen', {});

export const goToFeedbackScreen = (componentId, userName) =>
    pushScreen(componentId, 'Profile.FeedbackScreen', {
        passProps: {userName},
    });

export const goToThanksScreen = componentId =>
    pushScreen(componentId, 'Profile.ThankYouScreen');

export const goToUserChat = (componentId, passProps = {}) =>
    pushScreen(componentId, 'Conversations.UserChat', {
        passProps,
    });
