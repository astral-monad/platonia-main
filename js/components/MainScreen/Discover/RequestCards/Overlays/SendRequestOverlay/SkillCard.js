import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
// Local Imports
import theme from '../../../../../../../styles/theme';

const SkillCard = props => (
    <View style={[styles.container, props.containerStyle]}>
        {/* Header */}
        <View style={styles.headerContainer}>
            <Icon name="bolt" size={10} style={{color: 'yellow'}} />
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>
                    You are requesting {props.userName}
                    's superpower
                </Text>
            </View>
        </View>
        {/* Content */}
        <View style={styles.bodyContainer}>
            <Text style={styles.bodyText}>"{props.text}"</Text>
        </View>
    </View>
);

SkillCard.propTypes = {
    userName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    containerStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLOR_7,
        padding: 20,
        borderRadius: theme.BORDER_RADIUS_2,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTextContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10,
    },
    headerText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_2,
    },
    bodyContainer: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_2,
        fontStyle: 'italic',
        fontFamily: 'Futura',
    },
});

export default SkillCard;
