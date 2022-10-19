import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
// Local imports
import {showOverlay} from 'js/navigation';
import theme from 'platonia_client/styles/theme';

/*
State Variables:
- showAction - reflects whether the request has been sent or not. Accordingly the card is rendered.
*/

const RequestCard = props => {
    const allowedActions = props.profile.allowedActions || [];
    const canRequest = allowedActions.filter(a => a === 'request').length;
    const canDecline = allowedActions.filter(a => a === 'decline').length;
    const canAccept = allowedActions.filter(a => a === 'accept').length;

    const [showAction, changeActionStatus] = useState(
        canRequest || (canDecline && !canAccept),
    );

    const sendRequest = () => {
        showOverlay('Discover.SendRequestOverlay', {
            passProps: {
                profile: props.profile,
                superpower: props.superpower,
                changeActionStatus: () => {
                    changeActionStatus(!showAction);
                },
            },
        });
    };

    const cancelRequest = () => {
        showOverlay('Discover.CancelRequestOverlay', {
            passProps: {
                profile: props.profile,
                superpower: props.superpower,
                changeActionStatus: () => {
                    changeActionStatus(!showAction);
                },
            },
        });
    };

    const RequestButton = () => {
        return (
            <TouchableOpacity onPress={sendRequest} style={styles.requestBtn}>
                <Text style={styles.requestBtnText}>{'Request'}</Text>
            </TouchableOpacity>
        );
    };

    const DeclineButton = () => {
        return (
            <TouchableOpacity onPress={cancelRequest} style={styles.requestBtn}>
                <Text style={styles.requestBtnText}>{'Cancel'}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container]}>
            <Icon name="bolt" size={15} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.superpower.description}</Text>
            </View>
            {showAction ? (
                canRequest ? (
                    <>
                        <View style={styles.vrule} />
                        <RequestButton />
                    </>
                ) : canDecline && !canAccept ? (
                    <>
                        <View style={styles.vrule} />
                        <DeclineButton />
                    </>
                ) : (
                    false
                )
            ) : (
                false
            )}
        </View>
    );
};

RequestCard.propTypes = {
    profile: PropTypes.object.isRequired,
    superpower: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 5,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: theme.BORDER_RADIUS_1,
    },
    icon: {
        color: 'yellow',
        alignSelf: 'center',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 10,
        alignSelf: 'center',
        flexWrap: 'wrap',
    },
    text: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        lineHeight: 20,
    },
    vrule: {
        borderRightColor: theme.COLOR_7,
        borderRightWidth: 2,
    },
    requestBtn: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    requestBtnText: {color: 'white', fontWeight: theme.FONT_WEIGHT_2},
});

export default RequestCard;
