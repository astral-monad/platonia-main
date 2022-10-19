import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
// Local Imports
import TagInput from './TagInput';
import theme from 'platonia_client/styles/theme';

const SpecialTagInput = props => (
    <View style={[styles.container, props.containerStyle]}>
        <View
            style={[
                styles.textFieldHeadingContainer,
                props.textFieldNameContainerStyle,
            ]}>
            <Text
                style={[styles.textFieldHeadingText, props.textFieldNameStyle]}>
                {props.textFieldName}
            </Text>
        </View>

        <TagInput
            style={props.textInputStyle}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            initialTags={props.initialTags}
            handleTags={props.handleTags}
            editable={props.editable}
            keyboardAppearance={props.keyboardAppearance}
            keyboardType={props.keyboardType}
            maxLength={props.maxLength}
        />
    </View>
);

SpecialTagInput.propTypes = {
    textFieldName: PropTypes.string.isRequired,
    handleTags: PropTypes.func.isRequired,
    maxLength: PropTypes.number.isRequired,
    initialTags: PropTypes.array,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    containerStyle: PropTypes.object,
    textFieldNameContainerStyle: PropTypes.object,
    textFieldNameStyle: PropTypes.object,
    textInputStyle: PropTypes.object,
    editable: PropTypes.bool,
    keyboardAppearance: PropTypes.string,
    keyboardType: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.BORDER_RADIUS_1,
        borderWidth: 1,
        borderColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    textFieldHeadingContainer: {
        position: 'absolute',
        backgroundColor: theme.COLOR_1,
        top: -10,
        left: 15,
        paddingHorizontal: 5,
        zIndex: 50,
    },
    textFieldHeadingText: {color: 'white'},
});

export default SpecialTagInput;
