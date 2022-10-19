import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
// Local Imports
import theme from '../../../styles/theme';

const SpecialTextInput = props => (
    <View style={[styles.container, props.containerStyle]}>
        <View
            style={[
                styles.textFieldNameContainer,
                props.textFieldNameContainerStyle,
            ]}>
            <Text style={[styles.white, props.textFieldNameStyle]}>
                {props.textFieldName}
            </Text>
        </View>

        <TextInput
            style={[styles.white, props.textInputStyle]}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            value={props.value}
            onChangeText={props.onChangeText}
            editable={props.editable}
            keyboardAppearance={props.keyboardAppearance}
            keyboardType={props.keyboardType}
            autoCapitalize={props.autoCapitalize}
            textContentType={props.textContentType}
            autoCorrect={props.autoCorrect}
            autoFocus={props.autoFocus}
            secureTextEntry={props.secureTextEntry}
        />
    </View>
);

SpecialTextInput.defaultProps = {
    keyboardAppearance: 'dark',
    keyboardType: 'default',
};

SpecialTextInput.propTypes = {
    textFieldName: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    containerStyle: PropTypes.object,
    textFieldNameContainerStyle: PropTypes.object,
    textFieldNameStyle: PropTypes.object,
    textInputStyle: PropTypes.object,
    editable: PropTypes.bool,
    keyboardAppearance: PropTypes.string,
    keyboardType: PropTypes.string,
    autoCapitalize: PropTypes.string,
    textContentType: PropTypes.string,
    autoCorrect: PropTypes.bool,
    autoFocus: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
};

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.BORDER_RADIUS_1,
        borderWidth: 1,
        borderColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    textFieldNameContainer: {
        position: 'absolute',
        backgroundColor: theme.COLOR_1,
        top: -10,
        left: 15,
        paddingHorizontal: 5,
        zIndex: 50,
    },
    white: {color: 'white'},
});

export default SpecialTextInput;
