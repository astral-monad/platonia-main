import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
// Local Imports
import theme from '../../../styles/theme';

const NavigationBtn = props => (
    <TouchableOpacity
        style={[styles.container, props.containerStyle]}
        onPress={props.onPress}>
        {props.iconSide === 'left' && (
            <Icon
                name={props.iconName}
                size={props.iconSize}
                style={[styles.icon, props.iconStyle]}
            />
        )}
        {props.text && (
            <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
        )}
        {props.iconSide === 'right' && (
            <Icon
                name={props.iconName}
                size={props.iconSize}
                style={[styles.icon, props.iconStyle]}
            />
        )}
    </TouchableOpacity>
);

NavigationBtn.defaultProps = {
    iconName: 'chevron-left',
    iconSide: 'left',
    iconSize: 15,
};

NavigationBtn.propTypes = {
    iconName: PropTypes.string.isRequired,
    iconSide: PropTypes.oneOf(['left', 'right']),
    iconSize: PropTypes.number,
    text: PropTypes.string,
    onPress: PropTypes.func,
    containerStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    textStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {color: 'white', fontSize: theme.FONT_SIZE_1},
    icon: {color: 'white'},
});

export default NavigationBtn;
