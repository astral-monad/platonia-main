import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';
import PropTypes from 'prop-types';
// Local Imports
import theme from 'platonia_client/styles/theme';

const FBLoginButton = props => {
    /* Refer to react-native-fbsdk docs for help */
    const facebookLogin = async p => {
        const {publishPermissions, onLoginFinished} = p;
        let result;
        try {
            LoginManager.setLoginBehavior('browser');
            result = await LoginManager.logInWithPermissions(
                publishPermissions,
            );
        } catch (error) {
            onLoginFinished(error);
            return;
        }
        onLoginFinished(null, result);
    };

    return (
        <TouchableOpacity
            style={styles.fbButton}
            onPress={() => facebookLogin(props)}>
            <Text style={styles.fbButtonText}>Login with Facebook</Text>
        </TouchableOpacity>
    );
};

FBLoginButton.defaultProps = {
    publishPermissions: ['public_profile', 'email'],
};

FBLoginButton.propTypes = {
    publishPermissions: PropTypes.array.isRequired,
    onLoginFinished: PropTypes.func.isRequired,
    onLogoutFinished: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    fbButton: {
        height: 60,
        backgroundColor: '#475993', //Note: This is the only place where this color is used. (Color is facebook blue)
        alignItems: 'center',
        justifyContent: 'center',
    },
    fbButtonText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_2,
    },
});

export default FBLoginButton;
