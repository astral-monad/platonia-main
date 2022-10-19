import React, {useState} from 'react';
import {
    SafeAreaView,
    Text,
    Dimensions,
    View,
    Keyboard,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// Local Imports
import NavBtn from '../../../Global/NavigationBtn';
import BigRedButton from '../../../Global/BigRedButton';
import SmallRedButton from '../../../Global/SmallRedButton';
import SpecialTextInput from '../../../Global/SpecialTextInput';
import SpecialTagInput from '../../../Global/SpecialTagInput';
import {goToPrevScreen} from '../../../../navigation/gotoactions';
import {showOverlay} from '../../../../navigation/index';
import theme from '../../../../../styles/theme';
import {updateSuperpower, removeSuperpower} from 'js/redux/actions/superpowers';

// FIXME: Backend is not coordinating with redux in updating the superpowers. IDs don't match
const EditScreen = props => {
    const [edited, setEdited] = useState(false);
    const [description, setDescription] = useState(
        props.superpower?.description || '',
    );
    const [tags, setTags] = useState(
        props.superpower?.skills?.map(s => s.skillName) || [],
    );
    const [learntFrom, setLearntFrom] = useState(
        props.superpower?.learntFrom || '',
    );

    const removeSuperpowerRedux = () => {
        const id = props.superpower.id;
        props.dispatch(removeSuperpower(id, {}));
    };

    const onSave = () => {
        const id = props.superpower.id;
        props.dispatch(
            updateSuperpower(id, description, tags, learntFrom, {
                onSuccess: () => goToPrevScreen(props.componentId),
            }),
        );
    };

    const onDelete = () => {
        showOverlay('Profile.EditSuperpowers.DeleteOverlay', {
            passProps: {
                superpowerDescription: description,
                onSuccess: () => {
                    removeSuperpowerRedux();
                    goToPrevScreen(props.componentId);
                },
            },
        });
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{flex: 1}}
            onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <NavBtn
                    containerStyle={styles.backBtn}
                    text="Back"
                    textStyle={{marginLeft: 5}}
                    onPress={() => goToPrevScreen(props.componentId)}
                />
                <Text style={styles.heading}>Edit Superpower</Text>
                <View style={styles.formContainer}>
                    <SpecialTextInput
                        textFieldName="Description"
                        placeholder="Add a description for this superpower"
                        placeholderTextColor={theme.COLOR_4}
                        value={description}
                        onChangeText={text => {
                            setDescription(text);
                            setEdited(true);
                        }}
                    />
                    <SpecialTagInput
                        textFieldName="Tags"
                        placeholder="Add words separated by commas"
                        placeholderTextColor={theme.COLOR_4}
                        initialTags={tags}
                        handleTags={newTags => {
                            setTags(newTags);
                            setEdited(true);
                        }}
                        maxLength={50}
                        containerStyle={styles.textInput}
                    />
                    <SpecialTextInput
                        textFieldName="Learnt From"
                        value={learntFrom}
                        placeholder="Whom did you learn this from?"
                        placeholderTextColor={theme.COLOR_4}
                        onChangeText={text => {
                            setLearntFrom(text);
                            setEdited(true);
                        }}
                        containerStyle={styles.textInput}
                    />
                    <SmallRedButton
                        onPress={onDelete}
                        containerStyle={styles.deleteBtn}
                        textStyle={{color: 'black'}}>
                        Delete
                    </SmallRedButton>
                </View>
                {edited && (
                    <BigRedButton
                        containerStyle={{marginTop: 'auto'}}
                        onPress={onSave}>
                        Save
                    </BigRedButton>
                )}
            </SafeAreaView>
        </TouchableOpacity>
    );
};

EditScreen.propTypes = {
    superpower: PropTypes.object.isRequired,
};

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLOR_1,
        alignItems: 'center',
    },
    backBtn: {
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    heading: {
        color: 'white',
        fontSize: theme.FONT_SIZE_4,
        fontWeight: theme.FONT_WEIGHT_3,
        marginTop: 10,
    },
    formContainer: {
        marginTop: 0.1 * height,
        width: 0.8 * width,
    },
    textInput: {marginTop: 0.04 * height},
    deleteBtn: {
        alignSelf: 'flex-end',
        marginTop: 20,
        backgroundColor: 'white',
        opacity: 0.5,
    },
});

export default connect()(EditScreen);
