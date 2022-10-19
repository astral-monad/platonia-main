import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import appleAuth, {
    AppleButton,
} from '@invertase/react-native-apple-authentication';

import theme from '../../../styles/theme';

import {loginViaApple} from '../../redux/actions/user';

import {goToWelcomeScreen, goToMainScreen} from '../../navigation/goToActions';

const AppleSignIn = props => {
    const onLoginFinished = token => {
        props.dispatch(
            loginViaApple({
                token,
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
    };

    const auth = async () => {
        try {
            const token = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [
                    appleAuth.Scope.EMAIL,
                    appleAuth.Scope.FULL_NAME,
                ],
            });

            onLoginFinished(token);
        } catch (e) {
            console.log('Error ', e);
        }
    };

    return (
        <>
            {Platform.OS === 'ios' && (
                <View style={styles.conainter}>
                    <AppleButton
                        style={styles.appleButton}
                        buttonType={AppleButton.Type.SIGN_IN}
                        onPress={() => auth()}
                    />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    conainter: {
        height: 60,
        backgroundColor: '#fff',
    },
    appleButton: {
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: theme.FONT_WEIGHT_2,
    },
});

export default connect()(AppleSignIn);
