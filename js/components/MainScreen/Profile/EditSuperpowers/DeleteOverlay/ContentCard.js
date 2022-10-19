import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
// Local Imports
import theme from 'platonia_client/styles/theme';

const ContentCard = props => {
    return (
        <View style={[styles.container, props.containerStyle]}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Icon name="bolt" size={10} style={{color: 'yellow'}} />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>
                        Are you sure you want to delete this superpower?
                    </Text>
                </View>
            </View>
            {/* Content */}
            <View style={styles.bodyTextContainer}>
                <Text style={styles.bodyText}>
                    "{props.superpowerDescription}"
                </Text>
            </View>
        </View>
    );
};

ContentCard.propTypes = {
    superpowerDescription: PropTypes.string.isRequired,
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
    bodyTextContainer: {
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

export default ContentCard;
