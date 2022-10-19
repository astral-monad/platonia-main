/* eslint-disable no-alert */
import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    SafeAreaView,
    Keyboard,
    StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';

// Local Imports
import {
    goToPrevScreen,
    goToWelcomeScreen,
    goToMainScreen,
    goToSignUpScreen,
} from 'js/navigation/goToActions';
import theme from 'platonia_client/styles/theme';
import SpecialTextInput from 'js/components/Global/SpecialTextInput';
import SmallRedButton from 'js/components/Global/SmallRedButton';
import NavBtn from 'js/components/Global/NavigationBtn';
import {loginViaEmail} from '../../../redux/actions/user';
import AnimatedBox from './AnimatedBox';

const EmailLogin = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordState, setPasswordState] = useState({
        verify: false,
        wrongPassword: false,
    });

    const onLoginSubmit = () => {
        props.dispatch(
            loginViaEmail(email, password, {
                onSuccess: user => {
                    if (user.wrongPassword) {
                        setPasswordState({verify: false, wrongPassword: true});
                    } else if (user.emailNotVerified) {
                        setPasswordState({verify: true, wrongPassword: false});
                    } else if (user.incompleteSignup) {
                        goToSignUpScreen(props.componentId);
                    } else if (user.incompleteOnboarding) {
                        goToWelcomeScreen();
                    } else {
                        goToMainScreen();
                    }
                },
                onFailure: () => alert('Login failed'),
            }),
        );
    };

    return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <NavBtn
                    containerStyle={styles.backBtn}
                    text="Back"
                    textStyle={{marginLeft: 5}}
                    onPress={() => goToPrevScreen(props.componentId)}
                />
                <View style={styles.formContainer}>
                    <Text style={styles.heading}>Login</Text>

                    <SpecialTextInput
                        textFieldName="Email"
                        placeholder="Enter your email address"
                        placeholderTextColor="#969696"
                        keyboardAppearance="dark"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        textContentType="emailAddress"
                        onChangeText={setEmail}
                        autoCorrect={false}
                    />

                    <SpecialTextInput
                        textFieldName="Password"
                        containerStyle={styles.inputContainer}
                        placeholder="Enter your password"
                        placeholderTextColor="#969696"
                        keyboardAppearance="dark"
                        secureTextEntry={true}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        textContentType="newPassword"
                        onChangeText={setPassword}
                        autoCorrect={false}
                    />

                    <SmallRedButton
                        containerStyle={styles.submitBtn}
                        onPress={onLoginSubmit}>
                        Submit
                    </SmallRedButton>

                    <View style={styles.signUpContainer}>
                        <Text style={{color: 'white'}}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => goToSignUpScreen(props.componentId)}>
                            <Text style={styles.signUpBtnText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    {passwordState.verify && (
                        <AnimatedBox>Please verify your email</AnimatedBox>
                    )}

                    {passwordState.wrongPassword && (
                        <AnimatedBox>Incorrect Password entered</AnimatedBox>
                    )}
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLOR_1,
        alignItems: 'center',
    },
    backBtn: {
        marginLeft: 10,
        alignSelf: 'flex-start',
    },
    formContainer: {width: '80%'},
    heading: {
        marginTop: 20,
        marginBottom: 40,
        color: 'white',
        fontSize: theme.FONT_SIZE_4,
        fontWeight: theme.FONT_WEIGHT_3,
    },
    inputContainer: {
        marginTop: 30,
    },
    submitBtn: {
        alignSelf: 'flex-end',
        marginTop: 20,
    },
    signUpContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    signUpBtnText: {
        padding: 10,
        color: theme.COLOR_2,
        fontWeight: theme.FONT_WEIGHT_3,
    },
});

export default connect()(EmailLogin);
