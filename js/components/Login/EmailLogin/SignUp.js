import React, {useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';
import {connect} from 'react-redux';

// Local Imports
import {
    goToPrevScreen,
    goToWelcomeScreen,
    goToMainScreen,
} from '../../../navigation/gotoactions';
import NavBtn from 'js/components/Global/NavigationBtn';
import SpecialTextInput from 'js/components/Global/SpecialTextInput';
import SmallRedButton from 'js/components/Global/SmallRedButton';
import AnimatedBox from './AnimatedBox';
import theme from 'platonia_client/styles/theme';
import {signupViaEmail} from '../../../redux/actions/user';

const SignUp = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDOB] = useState('');
    const [verify, setVerify] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    const onLoginSubmit = () => {
        if (password !== confirmPassword) {
            setVerify(false);
            setWrongPassword(true);
            return;
        }

        setWrongPassword(false);
        props.dispatch(
            signupViaEmail(email, password, username, dob, {
                onSuccess: user => {
                    if (user.wrongPassword) {
                        setVerify(false);
                        setWrongPassword(true);
                    } else if (user.emailNotVerified) {
                        setWrongPassword(false);
                        setVerify(true);
                    } else if (user.incompleteOnboarding) {
                        goToWelcomeScreen();
                    } else {
                        goToMainScreen();
                    }
                },
                onFailure: () => {
                    alert('Signup failed');
                },
            }),
        );
    };

    return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <NavBtn
                        containerStyle={styles.navBtn}
                        textStyle={{marginLeft: 5}}
                        text="Login"
                        onPress={() => goToPrevScreen(props.componentId)}
                    />
                    <View style={styles.formContainer}>
                        <Text style={styles.heading}>Sign Up</Text>
                        <SpecialTextInput
                            textFieldName="Username"
                            placeholder="Enter your username"
                            placeholderTextColor={theme.COLOR_4}
                            keyboardAppearance="dark"
                            keyboardType="default"
                            autoCapitalize="none"
                            textContentType="username"
                            onChangeText={setUsername}
                            autoCorrect={false}
                        />
                        <SpecialTextInput
                            textFieldName="Email"
                            containerStyle={styles.inputContainer}
                            placeholder="Enter your email address"
                            placeholderTextColor={theme.COLOR_4}
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
                            placeholderTextColor={theme.COLOR_4}
                            keyboardAppearance="dark"
                            secureTextEntry={true}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            textContentType="newPassword"
                            onChangeText={setPassword}
                            autoCorrect={false}
                        />
                        <SpecialTextInput
                            textFieldName="Confirm Password"
                            containerStyle={styles.inputContainer}
                            placeholder="Re-enter your password"
                            placeholderTextColor={theme.COLOR_4}
                            keyboardAppearance="dark"
                            secureTextEntry={true}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            textContentType="newPassword"
                            onChangeText={setConfirmPassword}
                            autoCorrect={false}
                        />
                        <SpecialTextInput
                            textFieldName="Date of Birth"
                            containerStyle={styles.inputContainer}
                            placeholder="YYYY-MM-DD"
                            placeholderTextColor={theme.COLOR_4}
                            keyboardAppearance="dark"
                            autoCapitalize="none"
                            onChangeText={setDOB}
                            autoCorrect={false}
                        />

                        <SmallRedButton
                            containerStyle={styles.submitBtn}
                            onPress={onLoginSubmit}>
                            Submit
                        </SmallRedButton>

                        {verify && (
                            <AnimatedBox>Please verify your email</AnimatedBox>
                        )}

                        {wrongPassword && (
                            <AnimatedBox>Passwords don't match</AnimatedBox>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        alignItems: 'center',
    },
    navBtn: {
        marginLeft: 10,
        alignSelf: 'flex-start',
    },
    formContainer: {width: 0.8 * width},
    heading: {
        marginTop: 20,
        marginBottom: 50,
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
});

export default connect()(SignUp);
