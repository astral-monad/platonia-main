/* eslint-disable no-alert */
import React from 'react';
import {View, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';

// Local Imports
import {loginViaFB} from '../../redux/actions/user';
import {
    goToEmailScreen,
    goToWelcomeScreen,
    goToMainScreen,
} from 'platonia-main/js/navigation/gotoactions.js';
import FBLoginButton from './FBLoginButton';
import AppleSignInButton from './AppleSignInButton';
import SwiperCard, {dot, activeDot} from './SwiperCard';
import PlatoniaLogo from './PlatoniaLogo';
import NavBtn from '../Global/NavigationBtn';
import BigRedButton from '../Global/BigRedButton';
import theme from '../../../styles/theme.js';

const LoginScreen = props => {
    const onLoginFinished = (error, result) => {
        if (error) {
            alert('Facebook login failed ' + error.message);
        } else if (result.isCancelled) {
            alert('Login was cancelled');
        } else {
            props.dispatch(
                loginViaFB({
                    onSuccess: user => {
                        if (user.incompleteOnboarding) {
                            goToWelcomeScreen();
                        } else {
                            goToMainScreen();
                        }
                    },
                    onFailure: () => alert('Login failed'),
                }),
            );
        }
    };

    const onLogoutFinished = () => {};

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.navbar}>
                <PlatoniaLogo />

                <NavBtn
                    text="Sneak Peek"
                    iconSide="right"
                    iconName="chevron-right"
                    iconStyle={{color: '#fff'}}
                    textStyle={{color: '#fff', marginRight: 5}}
                />
            </SafeAreaView>

            <View style={styles.swiper}>
                <Swiper
                    style={styles.wrapper}
                    dot={dot()}
                    activeDot={activeDot()}>
                    <SwiperCard
                        heading="Trade Superpowers"
                        subHeading="Meetup, Teach, Learn - Share the best in you!"
                    />
                    <SwiperCard
                        heading="Become Better, Together"
                        subHeading="Hone your superpowers, while making friends"
                    />
                    <SwiperCard
                        heading="Find Your Superheroes"
                        subHeading="Match with people whose superpowers you'd like to gain and are interested in yours"
                    />
                </Swiper>

                <BigRedButton
                    onPress={() => goToEmailScreen(props.componentId)}
                    textStyle={styles.emailBtnText}>
                    Login With Email
                </BigRedButton>

                <FBLoginButton
                    publishPermissions={['email']}
                    onLoginFinished={onLoginFinished}
                    onLogoutFinished={onLogoutFinished}
                />

                <AppleSignInButton />
            </View>
        </View>
    );
};

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#000',
    },
    navbar: {
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    swiper: {
        backgroundColor: theme.COLOR_1,
        height: 0.38 * height,
        justifyContent: 'flex-end',
    },
    emailBtnText: {
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_2,
    },
});

export default connect()(LoginScreen);
