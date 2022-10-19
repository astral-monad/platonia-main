import React from 'react';
import {
    TouchableOpacity,
    Text,
    Dimensions,
    View,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import theme from 'platonia_client/styles/theme';

const MenuButton = props => (
    <TouchableOpacity
        onPress={props.onPress || (() => null)}
        style={[styles.container, props.containerStyle]}>
        <View style={styles.leftIconContainer}>
            <Icon
                name={props.leftIcon}
                size={props.leftIconSize || 17}
                style={[styles.leftIcon, props.leftIconStyle]}
            />
        </View>
        <Text style={styles.text}>{props.children}</Text>
        {!props.disableChevron && (
            <Icon name="chevron-right" size={15} style={styles.rightIcon} />
        )}
    </TouchableOpacity>
);

MenuButton.defaultProps = {
    disableChevron: false,
};

MenuButton.propTypes = {
    containerStyle: PropTypes.object,
    leftIcon: PropTypes.string.isRequired,
    leftIconSize: PropTypes.number,
    leftIconStyle: PropTypes.object,
    children: PropTypes.node,
    onPress: PropTypes.func,
    disableChevron: PropTypes.bool,
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        flexDirection: 'row',
    },
    leftIconContainer: {
        marginLeft: 0.04 * width,
        width: 0.07 * width,
        alignItems: 'center',
    },
    leftIcon: {
        color: 'white',
    },
    text: {
        flex: 1,
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 0.08 * width,
        marginRight: 0.2 * width,
    },
    rightIcon: {color: 'white', marginRight: 0.05 * width},
});

export default MenuButton;
