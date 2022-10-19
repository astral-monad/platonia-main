import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
// Local Imports
import theme from 'platonia_client/styles/theme';

const SmallRedButton = props => {
    return (
        // The following TouchableOpacity has to be wrapped in a View
        // because otherwise the opacity of the button won't change on
        // state variable change.
        <View
            style={[
                {opacity: props.active ? 1 : 0.3},
                {...props.containerStyle, backgroundColor: null},
            ]}>
            <TouchableOpacity
                onPress={props.onPress}
                disabled={!props.active}
                style={[
                    {
                        backgroundColor:
                            props.containerStyle?.backgroundColor ||
                            (props.active ? theme.COLOR_2 : theme.COLOR_5),
                    },
                    styles.btn,
                ]}>
                <Text style={[styles.btnText, props.textStyle]}>
                    {props.children}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

SmallRedButton.defaultProps = {
    active: true,
};

SmallRedButton.propTypes = {
    active: PropTypes.bool,
    onPress: PropTypes.func,
    children: PropTypes.node.isRequired,
    containerStyle: PropTypes.object,
    textStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        borderRadius: theme.BORDER_RADIUS_1,
    },
    btnText: {color: 'white', fontWeight: theme.FONT_WEIGHT_2},
});

export default SmallRedButton;
