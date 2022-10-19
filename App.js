import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import store from './js/redux/store';
import {goToScreen, goToMainScreen} from './js/navigation';
import {isLoggedIn} from './js/redux/actions/user';

// Screens
// Login
import LoginScreen from './js/components/Login/LoginScreen';
import EmailScreen from './js/components/Login/EmailLogin';
import Login_SignUp from './js/components/Login/EmailLogin/SignUp';

import AddSuperPowerScreen from './js/components/SuperPower/AddSuperPowerScreen';
import Welcome from './js/components/Welcome';
import LearnScreen from './js/components/LearnScreen';

// Review SuperPower
import ReviewSuperPowerScreen from './js/components/SuperPower/ReviewSuperPowerScreen';
import ReviewSuperpower_DeleteSuperpowerOverlay from './js/components/SuperPower/ReviewSuperPowerScreen/DeleteSuperpowerOverlay';

// Suggest Superpower
import SuggestSuperPowerScreen from './js/components/SuperPower/SuggestSuperPowerScreen';
import SuggestSuperPower_SuperpowerOverlay from './js/components/SuperPower/SuggestSuperPowerScreen/SuperpowerOverlay';

// Discover Screen
import Discover from './js/components/MainScreen/Discover';
import Discover_UserProfile from './js/components/MainScreen/Discover/UserProfile';
import Discover_SendRequestOverlay from './js/components/MainScreen/Discover/RequestCards/Overlays/SendRequestOverlay';
import Discover_AddCommentOverlay from './js/components/MainScreen/Discover/RequestCards/Overlays/SendRequestOverlay/AddCommentOverlay';
import Discover_ReceiveRequestOverlay from './js/components/MainScreen/Discover/RequestCards/Overlays/ReceiveRequestOverlay';
import Discover_CancelRequestOverlay from './js/components/MainScreen/Discover/RequestCards/Overlays/CancelRequestOverlay';
import Discover_TagPressOverlay from './js/components/MainScreen/Discover/RequestCards/Overlays/TagPressOverlay';

// Profile Screen
import Profile from './js/components/MainScreen/Profile';
import Profile_FeedbackScreen from './js/components/MainScreen/Profile/FeedbackScreen';
import Profile_ThankYouScreen from './js/components/MainScreen/Profile/FeedbackScreen/Thanks';
import Profile_AddFriendsScreen from './js/components/MainScreen/Profile/FriendsScreen';
import Profile_EditProfile from './js/components/MainScreen/Profile/EditProfile';
import Profile_EditSuperpowers from './js/components/MainScreen/Profile/EditSuperpowers';
import Profile_EditSuperpowers_EditScreen from './js/components/MainScreen/Profile/EditSuperpowers/EditScreen';
import Profile_EditSuperpowers_DeleteOverlay from './js/components/MainScreen/Profile/EditSuperpowers/DeleteOverlay';

// Conversation Screen
import Conversations from './js/components/MainScreen/Conversations';
import Conversations_UserChat from './js/components/MainScreen/Conversations/UserChat';

//Search Overlay
import SearchOverlay from './js/components/MainScreen/Search';

const registerWithProvider = (componentId, Component) => {
    Navigation.registerComponent(
        componentId,
        () => props => {
            return (
                <Provider store={store}>
                    <Component {...props} />
                </Provider>
            );
        },
        () => Component,
    );
};

// Login
registerWithProvider('Login', LoginScreen);
registerWithProvider('EmailScreen', EmailScreen);
registerWithProvider('Login.SignUp', Login_SignUp);

registerWithProvider('AddSuperPower', AddSuperPowerScreen);
registerWithProvider('Welcome', Welcome);
registerWithProvider('LearnScreen', LearnScreen);

// Review Superpowers
registerWithProvider('ReviewSuperPower', ReviewSuperPowerScreen);
registerWithProvider(
    'ReviewSuperpower.DeleteSuperpowerOverlay',
    ReviewSuperpower_DeleteSuperpowerOverlay,
);

// Suggest Superpowers
registerWithProvider('SuggestSuperPower', SuggestSuperPowerScreen);
registerWithProvider(
    'SuggestSuperPower.SuperpowerOverlay',
    SuggestSuperPower_SuperpowerOverlay,
);

// Discover
registerWithProvider('Discover', Discover);
registerWithProvider('Discover.UserProfile', Discover_UserProfile);
registerWithProvider('Discover.AddCommentOverlay', Discover_AddCommentOverlay);
registerWithProvider(
    'Discover.SendRequestOverlay',
    Discover_SendRequestOverlay,
);
registerWithProvider(
    'Discover.ReceiveRequestOverlay',
    Discover_ReceiveRequestOverlay,
);
registerWithProvider(
    'Discover.CancelRequestOverlay',
    Discover_CancelRequestOverlay,
);
registerWithProvider('Discover.TagPressOverlay', Discover_TagPressOverlay);

// Profile
registerWithProvider('Profile', Profile);
registerWithProvider('Profile.FeedbackScreen', Profile_FeedbackScreen);
registerWithProvider('Profile.ThankYouScreen', Profile_ThankYouScreen);
registerWithProvider('Profile.AddFriendsScreen', Profile_AddFriendsScreen);
registerWithProvider('Profile.EditProfile', Profile_EditProfile);
registerWithProvider('Profile.EditSuperpowers', Profile_EditSuperpowers);
registerWithProvider(
    'Profile.EditSuperpowers.EditScreen',
    Profile_EditSuperpowers_EditScreen,
);
registerWithProvider(
    'Profile.EditSuperpowers.DeleteOverlay',
    Profile_EditSuperpowers_DeleteOverlay,
);

// Conversations
registerWithProvider('Conversations', Conversations);
registerWithProvider('Conversations.UserChat', Conversations_UserChat);

//Search
registerWithProvider('SearchOverlay', SearchOverlay);

Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
        topBar: {
            visible: false,
            drawBehind: true,
            animate: false,
        },
    });

    isLoggedIn().then(user => {
        if (!user) {
            goToScreen('Login');
            return;
        }

        if (user.incompleteOnboarding) {
            goToScreen('Welcome');
        } else {
            goToMainScreen();
        }
    });
});

