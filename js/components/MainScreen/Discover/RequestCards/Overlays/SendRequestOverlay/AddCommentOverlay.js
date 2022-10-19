import React, {useState} from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
// Local imports
import SkillCard from './SkillCard';
import {showOverlay} from 'js/navigation';
import theme from 'platonia_client/styles/theme';

const AddCommentOverlay = props => {
    const [comment, setComment] = useState(props.comment);

    const handleDoneBtn = cmnt => {
        /*
        On pressing the Done button, dismiss this overlay and show the SendRequestOverlay
        */
        Navigation.dismissOverlay(props.componentId);
        showOverlay('Discover.SendRequestOverlay', {
            passProps: {
                profile: props.profile,
                superpower: props.superpower,
                changeActionStatus: props.changeActionStatus,
                comment: cmnt,
            },
        });
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <SkillCard
                userName={props.profile.username}
                text={props.superpower.description}
                containerStyle={styles.card}
            />
            <TouchableOpacity
                onPress={() => handleDoneBtn(props.comment)}
                style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        autoFocus={true}
                        keyboardAppearance="dark"
                        multiline={true}
                        value={comment}
                        placeholder="Add Comment..."
                        placeholderTextColor={theme.COLOR_4}
                        onChangeText={setComment}
                        style={{
                            color: 'white',
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={{alignSelf: 'center'}}
                    onPress={() => handleDoneBtn(comment)}>
                    <Text style={styles.doneBtnText}>Done</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

AddCommentOverlay.defaultProps = {
    comment: '',
};

AddCommentOverlay.propTypes = {
    profile: PropTypes.object.isRequired,
    superpower: PropTypes.object.isRequired,
    changeActionStatus: PropTypes.func.isRequired,
    comment: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: theme.COLOR_6,
    },
    card: {
        marginBottom: 25,
    },
    cancelBtn: {
        backgroundColor: theme.COLOR_5,
        marginBottom: 25,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 20,
    },
    cancelBtnText: {
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_3,
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: theme.COLOR_1,
        alignItems: 'flex-start',
    },
    textInputContainer: {
        height: 70,
        flex: 1,
        padding: 5,
        margin: 10,
        borderRadius: theme.BORDER_RADIUS_2,
    },
    doneBtnText: {
        color: 'yellow',
        fontSize: theme.FONT_SIZE_1,
        padding: 20,
    },
});

export default AddCommentOverlay;
