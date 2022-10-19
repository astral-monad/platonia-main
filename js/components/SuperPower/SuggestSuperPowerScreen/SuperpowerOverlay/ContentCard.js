import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
// Local Imports
import TagInput from 'js/components/Global/TagInput';
import theme from 'platonia_client/styles/theme';

// FIXME
// Weird Error - using both autofocus and manual focus using refs aren't able
// to get the keyboard to automatically show up. The textinput focuses but the keyboard doesn't show up
// For an attempted solution, look at commented code
const ContentCard = props => {
    // const textRef = useRef(null);
    // useEffect(() => {
    //     InteractionManager.runAfterInteractions(() => {
    //         textRef.current?.focus();
    //     });
    // });
    return (
        <View style={[styles.container, props.containerStyle]}>
            {/* Header */}
            <View style={styles.header}>
                <Icon name="bolt" size={10} style={{color: 'yellow'}} />
                <Text style={styles.headerText}>
                    Tell us more about your superpower
                </Text>
            </View>

            {/* Content */}
            <View style={styles.formContainer}>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.inputFieldText}>Description</Text>
                    <View style={styles.inputFieldTextInputContainer}>
                        <TextInput
                            // ref={textRef}
                            onChangeText={text =>
                                props.setParentState({
                                    ...props.textFields,
                                    description: text,
                                })
                            }
                            placeholder={
                                'Enter Superpower Description (required)'
                            }
                            placeholderTextColor={theme.COLOR_4}
                            value={props.textFields.description}
                            style={styles.inputFieldTextInput}
                            multiline={true}
                            maxLength={280}
                            keyboardAppearance="dark"
                            // autoFocus={true}
                        />
                    </View>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.inputFieldText}>Tags</Text>
                    <View style={styles.inputFieldTextInputContainer}>
                        <TagInput
                            handleTags={newTags =>
                                props.setParentState({
                                    ...props.textFields,
                                    tags: newTags,
                                })
                            }
                            placeholder={'Enter Superpower Tags (required)'}
                            placeholderTextColor={theme.COLOR_4}
                            maxLength={50}
                            style={styles.inputFieldTextInput}
                            initialTags={props.textFields.tags}
                        />
                    </View>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.inputFieldText}>Learnt From</Text>
                    <View style={styles.inputFieldTextInputContainer}>
                        <TextInput
                            onChangeText={text =>
                                props.setParentState({
                                    ...props.textFields,
                                    learntFrom: text,
                                })
                            }
                            placeholder="From whom did you learn this skill?"
                            placeholderTextColor={theme.COLOR_4}
                            style={styles.inputFieldTextInput}
                            value={props.textFields.learntFrom}
                            multiline={true}
                            maxLength={280}
                            keyboardAppearance="dark"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

ContentCard.propTypes = {
    containerStyle: PropTypes.object,
    textFields: PropTypes.object.isRequired,
    setParentState: PropTypes.func.isRequired,
};

export default ContentCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLOR_7,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: theme.BORDER_RADIUS_2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: 5,
        color: 'white',
        fontSize: 15,
        fontWeight: theme.FONT_WEIGHT_2,
    },
    formContainer: {marginTop: 20},
    inputFieldContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputFieldText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        flex: 1,
        textAlign: 'right',
        marginRight: 10,
    },
    inputFieldTextInputContainer: {
        backgroundColor: theme.COLOR_1,
        width: '75%',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: theme.BORDER_RADIUS_1,
    },
    inputFieldTextInput: {
        fontSize: theme.FONT_SIZE_1,
        color: 'white',
        paddingTop: 0,
    },
});
