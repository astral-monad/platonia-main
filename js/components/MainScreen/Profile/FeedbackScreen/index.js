import React, {useState} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    Keyboard,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
// Local Imports
import NavBtn from '../../../Global/NavigationBtn';
import {goToThanksScreen, goToPrevScreen} from '../../../../navigation/gotoactions';
import theme from '../../../../../stlyes/theme';
import SmallRedButton from '../../../Global/SmallRedButton';

const FeedbackScreen = props => {
    const [text, setText] = useState('');

    const textEmpty = text === '';
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{flex: 1}}
            onPress={Keyboard.dismiss}
            accessible={false}>
            <SafeAreaView style={styles.container}>
                <NavBtn
                    iconName="chevron-left"
                    onPress={() => goToPrevScreen(props.componentId)}
                    text="Back"
                    containerStyle={styles.backBtn}
                    textStyle={{marginLeft: 5}}
                />
                <View style={styles.header}>
                    <Text style={styles.headingText}>
                        Hey, {props.userName.split(' ')[0]}
                    </Text>
                    <Text style={styles.subHeadingText}>
                        Your valuable feedback will help us improve your app
                        experience
                    </Text>

                    <View style={styles.formContainer}>
                        <TextInput
                            style={{
                                color: 'white',
                            }}
                            multiline={true}
                            keyboardAppearance="dark"
                            blurOnSubmit={true}
                            onChangeText={setText}
                        />
                    </View>

                    <SmallRedButton
                        active={!textEmpty}
                        containerStyle={{
                            alignSelf: 'flex-end',
                            marginTop: 20,
                        }}
                        onPress={() => goToThanksScreen(props.componentId)}>
                        Submit
                    </SmallRedButton>
                </View>
            </SafeAreaView>
        </TouchableOpacity>
    );
};

FeedbackScreen.propTypes = {
    userName: PropTypes.string.isRequired,
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLOR_1,
        flex: 1,
    },
    backBtn: {
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    header: {
        marginTop: 20,
        width: 0.85 * width,
        alignSelf: 'center',
    },
    headingText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_3,
        fontWeight: theme.FONT_WEIGHT_2,
    },
    subHeadingText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        marginTop: 17,
    },
    formContainer: {
        marginTop: 20,
        height: 0.2 * height,
        backgroundColor: theme.COLOR_7,
        borderRadius: theme.BORDER_RADIUS_1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
});

export default FeedbackScreen;
