import React from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
// Local Imports
import theme from 'platonia_client/styles/theme';

const AnimatedBox = props => (
    <Animatable.View
        animation="fadeIn"
        duration={props.duration}
        style={styles.animatedBoxContainer}>
        <Text style={styles.animatedBoxText}>{props.children}</Text>
    </Animatable.View>
);

/* The duration props defines the duration of the animation. The box fades in in this duration */
AnimatedBox.defaultProps = {
    duration: 3000,
};

AnimatedBox.propTypes = {
    duration: PropTypes.number,
    children: PropTypes.node.isRequired,
};

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
    animatedBoxContainer: {
        marginTop: 0.1 * height,
        justifyContent: 'center',
        backgroundColor: theme.COLOR_3,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: theme.BORDER_RADIUS_1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    animatedBoxText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_2,
    },
});

export default AnimatedBox;
