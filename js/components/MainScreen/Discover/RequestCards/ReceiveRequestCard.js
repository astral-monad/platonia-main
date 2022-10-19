import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
// Local Imports
import theme from '../../../../../styles/theme';
import {showOverlay} from '../../../../navigation';

const ReceiveRequestCard = props => {
    const handleOnRequest = () => {
        /*
        Overlay is triggered on pressing the card
        */
        showOverlay('Discover.ReceiveRequestOverlay', {
            passProps: {
                profile: props.profile,
                requestedSuperpower: props.requestedSuperpower,
                comment: props.comment,
            },
        });
    };

    const renderCardContent = () => (
        <>
            {/* Header of Received Request */}
            <Text style={styles.cardHeading}>
                {props.profile.username} requested to learn your superpower:
            </Text>

            {/* Body and comment of Received Request */}
            <View style={styles.cardBodyContainer}>
                <View style={styles.superpowerTextContainer}>
                    <Icon name="bolt" size={15} style={{color: 'black'}} />
                    <Text
                        numberOfLines={props.numberOfLines_superpower || 2}
                        style={[
                            styles.superpowerText,
                            props.superpowerTextStyle,
                        ]}>
                        "{props.requestedSuperpower.description}"
                    </Text>
                </View>

                {props.comment && props.comment.length ? (
                    <Text
                        numberOfLines={props.numberOfLines_comment || 1}
                        style={[styles.commentText, props.commentTextStyle]}>
                        {props.comment}
                    </Text>
                ) : (
                    false
                )}
            </View>
        </>
    );

    return (
        <View style={[styles.container, props.containerStyle]}>
            {props.enableTouch ? (
                <TouchableOpacity style={{flex: 1}} onPress={handleOnRequest}>
                    {renderCardContent()}
                </TouchableOpacity>
            ) : (
                <View style={{flex: 1}}>{renderCardContent()}</View>
            )}
        </View>
    );
};

ReceiveRequestCard.propTypes = {
    profile: PropTypes.object.isRequired,
    requestedSuperpower: PropTypes.object.isRequired,
    comment: PropTypes.string,
    containerStyle: PropTypes.object,
    superpowerTextStyle: PropTypes.object,
    commentTextStyle: PropTypes.object,
    enableTouch: PropTypes.bool,
    numberOfLines_superpower: PropTypes.number,
    numberOfLines_comment: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    cardHeading: {
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_2,
    },
    cardBodyContainer: {
        marginTop: 15,
        marginRight: 20,
        marginLeft: 5,
    },
    superpowerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    superpowerText: {
        fontStyle: 'italic',
        marginLeft: 10,
        flexWrap: 'wrap',
    },
    commentText: {
        color: theme.COLOR_4,
        marginTop: 15,
    },
});

export default ReceiveRequestCard;
