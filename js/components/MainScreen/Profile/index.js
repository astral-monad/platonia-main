/* eslint-disable no-alert */
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Navigation} from 'react-native-navigation';
// Local Imports
import UserProfileCard from '../../Global/UserProfileCard';
import MenuButton from './MenuButton';
import {logout} from '../../../redux/actions/user';
import {
    goToLoginScreen,
    goToEditProfile,
    goToEditSuperpowers,
    goToLearnScreenFromProfile,
    goToInviteFriendsScreen,
    goToFeedbackScreen,
} from '../../../navigation/gotoactions';
import theme from '../../../../styles/theme';

const Profile = props => {
    useEffect(() => {
        Promise.all([Icon.getImageSource('portrait', 20, '#ffffff')]).then(
            sources => {
                Navigation.mergeOptions(props.componentId, {
                    bottomTab: {
                        text: 'Profile',
                        // theme not used here for color. exceptional case
                        textColor: '#ffffff50',
                        iconColor: '#ffffff50',
                        selectedTextColor: '#ffffffff',
                        selectedIconColor: '#ffffffff',
                        icon: sources[0],
                        fontSize: theme.FONT_SIZE_0,
                        selectedFontSize: theme.FONT_SIZE_3,
                    },
                });
            },
        );
    }, []);

    const onLogout = () => {
        props.dispatch(
            logout({
                onSuccess: () => {
                    goToLoginScreen();
                },
                onFailure: () => alert('Logout failed'),
            }),
        );
    };

    const user = props.user;

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => goToEditProfile(props.componentId, user)}>
                <UserProfileCard
                    image={user.profilePic}
                    imageDiameter={100}
                    containerStyle={{
                        marginTop: 20,
                    }}
                    textContainerStyle={{
                        justifyContent: 'center',
                    }}>
                    <Text style={styles.profileCardHeadingText}>
                        {user.username}
                    </Text>
                    <Text style={styles.profileCardSubheadingText}>
                        View and Edit Profile
                    </Text>
                </UserProfileCard>
            </TouchableOpacity>

            <View style={{marginTop: 50}}>
                <MenuButton
                    leftIcon="bolt"
                    containerStyle={styles.menuButton}
                    onPress={() => {
                        goToEditSuperpowers(props.componentId);
                    }}>
                    My Superpowers
                </MenuButton>
                <MenuButton
                    leftIcon="star"
                    containerStyle={styles.menuButton}
                    onPress={() => {
                        goToLearnScreenFromProfile(props.componentId);
                    }}>
                    Skills I am Following
                </MenuButton>
                <MenuButton
                    leftIcon="user-friends"
                    containerStyle={styles.menuButton}
                    onPress={() => goToInviteFriendsScreen(props.componentId)}>
                    Invite Friends
                </MenuButton>
                <MenuButton
                    leftIcon="comment-alt"
                    containerStyle={styles.menuButton}
                    onPress={() => {
                        goToFeedbackScreen(props.componentId, user.username);
                    }}>
                    Give Feedback
                </MenuButton>
                <MenuButton
                    leftIcon="sign-out-alt"
                    containerStyle={styles.logOutBtn}
                    disableChevron={true}
                    onPress={onLogout}>
                    Logout
                </MenuButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLOR_1,
    },
    profileCardHeadingText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_2,
        marginBottom: 5,
    },
    profileCardSubheadingText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_1,
    },
    menuButton: {
        marginTop: 10,
    },
    logOutBtn: {marginTop: 50, opacity: 0.5},
});

function mapStateToProps(state) {
    return {
        user: state.user?.profile || {},
    };
}

export default connect(mapStateToProps)(Profile);
