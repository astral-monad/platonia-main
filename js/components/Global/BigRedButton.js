import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
// Local Imports
import theme from 'platonia_client/styles/theme';

const BigRedButton = props => (
    <TouchableOpacity
        disabled={!props.active}
        onPress={props.onPress}
        style={[
            styles.container,
            {backgroundColor: props.active ? theme.COLOR_2 : 'gray'},
            props.containerStyle,
        ]}>
        <Text style={[styles.btnText, props.textStyle]}>{props.children}</Text>
    </TouchableOpacity>
);

BigRedButton.defaultProps = {
    active: true,
};

BigRedButton.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.bool,
    onPress: PropTypes.func,
    containerStyle: PropTypes.object,
    textStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_2,
    },
});

export default BigRedButton;
