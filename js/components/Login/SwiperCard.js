import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
// Local Imports
import theme from '../../../styles/theme';

function SwiperCard(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.cardHeading}>{props.heading}</Text>
            <View style={styles.hrule} />
            <Text style={styles.cardSubHeading}>{props.subHeading}</Text>
        </View>
    );
}

export function dot() {
    return <View style={styles.dot} />;
}

export function activeDot() {
    return <View style={styles.activeDot} />;
}

SwiperCard.propTypes = {
    heading: PropTypes.string.isRequired,
    subHeading: PropTypes.string.isRequired,
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        width: 0.7 * width,
    },
    cardHeading: {
        color: 'white',
        marginTop: 30,
        marginBottom: 5,
        fontFamily: 'Al Nile',
        textAlign: 'center',
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_2,
    },
    cardSubHeading: {
        marginTop: 15,
        color: 'white',
        flexWrap: 'wrap',
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_2,
        textAlign: 'center',
    },
    hrule: {
        borderWidth: 1,
        borderColor: 'white',
        marginHorizontal: 1,
        width: 0.55 * width,
    },
    dot: {
        backgroundColor: '#CCCCCC', //Special Case
        width: 5,
        height: 5,
        borderRadius: 50,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    activeDot: {
        backgroundColor: '#CCCCCC', //Special Case
        width: 10,
        height: 10,
        borderRadius: 50,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
});

export default SwiperCard;
