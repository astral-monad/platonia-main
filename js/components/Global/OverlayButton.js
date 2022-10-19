import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
// Local Imports
import theme from '../../../styles/theme';

const OverlayButton = props => {
    return (
        <TouchableOpacity
            activeOpacity={props.activeOpacity}
            style={[styles.btn, props.containerStyle]}
            onPress={props.onPress}>
            <Text style={[styles.btnText, props.textStyle]}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
};

OverlayButton.defaultProps = {
    activeOpacity: 0.5,
};

OverlayButton.propTypes = {
    activeOpacity: PropTypes.number,
    onPress: PropTypes.func,
    children: PropTypes.node.isRequired,
    containerStyle: PropTypes.object,
    textStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        width: '80%', //We are using percentage here because we want the width of the parent not the window.
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: theme.BORDER_RADIUS_3,
        backgroundColor: theme.COLOR_2,
    },
    btnText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_2,
    },
});

export default OverlayButton;
