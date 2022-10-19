import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
// Local imports
import theme from 'platonia_client/styles/theme';

const ContentCard = props => (
    <View style={[styles.container, props.containerStyle]}>
        {/* Header */}
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            <Icon name="bolt" size={10} style={{color: 'yellow'}} />
            <View style={styles.heading}>
                <Text style={styles.headingText}>
                    Are you sure you want to delete this superpower?
                </Text>
            </View>
        </View>
        {/* Content */}
        <View style={styles.subHeading}>
            <Text style={styles.subHeadingText}>
                "{props.superpowerDescription}"
            </Text>
        </View>
    </View>
);

ContentCard.propTypes = {
    superpowerDescription: PropTypes.string.isRequired,
    containerStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLOR_3,
        padding: 20,
        borderRadius: theme.BORDER_RADIUS_2,
    },
    heading: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10,
    },
    headingText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_2,
    },
    subHeading: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subHeadingText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_2,
        fontStyle: 'italic',
        fontFamily: 'Futura',
    },
});

export default ContentCard;
