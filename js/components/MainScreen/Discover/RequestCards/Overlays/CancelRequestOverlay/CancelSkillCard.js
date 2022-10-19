import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
// Local Imports
import theme from 'platonia_client/styles/theme';

const CancelSkillCard = props => (
    <View style={[styles.container, props.containerStyle]}>
        {/* Header */}
        <View style={styles.headingContainer}>
            <Text style={styles.headingText}>
                Are you sure you want to cancel your request for{' '}
                {props.profile.userName}
                's superpower?
            </Text>
        </View>
        {/* Content */}
        <View style={styles.bodyContainer}>
            <Text style={styles.bodyText}>
                "{props.superpower.description}"
            </Text>
        </View>
    </View>
);

CancelSkillCard.propTypes = {
    profile: PropTypes.object.isRequired,
    superpower: PropTypes.object.isRequired,
    containerStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLOR_7,
        padding: 20,
        borderRadius: theme.BORDER_RADIUS_2,
    },
    headingContainer: {
        alignItems: 'center',
    },
    headingText: {
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

export default CancelSkillCard;
