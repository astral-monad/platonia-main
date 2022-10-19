import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Tag(props) {
    const touchable = (
        <TouchableOpacity
            activeOpacity={props.activeOpacity}
            onPress={props.onPress}
            style={[
                styles.container,
                {
                    flexDirection:
                        props.drawX || props.drawPlus ? 'row' : 'column',
                    alignItems: (props.drawX || props.drawPlus) && 'center',
                },
                props.containerStyle,
            ]}>
            {props.drawPlus && <Icon name="plus" style={styles.plusIcon} />}
            <Text style={[styles.text, props.textStyle]}>{props.children}</Text>
            {props.drawX && <Icon name="times" style={styles.xIcon} />}
        </TouchableOpacity>
    );

    const non_touchable = (
        <View style={[styles.container, props.containerStyle]}>
            <Text style={[styles.text, props.textStyle]}>{props.children}</Text>
        </View>
    );
    return <>{props.isTouchable ? touchable : non_touchable}</>;
}

Tag.defaultProps = {
    isTouchable: false,
};

Tag.propTypes = {
    isTouchable: PropTypes.bool,
    containerStyle: PropTypes.object,
    textStyle: PropTypes.object,
    children: PropTypes.node.isRequired,
    onPress: PropTypes.func,
    activeOpacity: PropTypes.number,
    drawX: PropTypes.bool,
    drawPlus: PropTypes.bool,
};
const styles = StyleSheet.create({
    container: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 3,
        marginVertical: 3,
        paddingVertical: 3,
        paddingHorizontal: 6,
    },
    plusIcon: {
        color: 'white',
        marginRight: 5,
    },
    xIcon: {
        color: 'white',
        marginLeft: 5,
    },
    text: {color: 'white'},
});

export default Tag;
