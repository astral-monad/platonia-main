import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
// Local Imports
import Tag from '../../../Global/Tag';
import {showOverlay} from 'js/navigation';
import theme from 'platonia_client/styles/theme';

const ProfileCollapsibleCard = props => {
    const allowedActions = props.profile.allowedActions || [];
    const canRequest = allowedActions.filter(a => a === 'request').length;
    const canDecline = allowedActions.filter(a => a === 'decline').length;
    const canAccept = allowedActions.filter(a => a === 'accept').length;

    const [toggleCollapse, setToggleCollapse] = useState(true);
    const [showAction, changeActionStatus] = useState(
        canRequest || (canDecline && !canAccept),
    );
    const handleCollapsePress = () => setToggleCollapse(!toggleCollapse);

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

    const renderCardHeader = () => (
        <View style={[styles.cardHeaderContainer]}>
            <Text
                style={styles.cardHeaderDescription}
                numberOfLines={toggleCollapse ? 2 : 0}>
                {props.superpower.description}
            </Text>
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

    const renderCardBody = () => (
        <Collapsible collapsed={toggleCollapse} align="top">
            <View style={styles.collapsibleTagsContainer}>
                {props.superpower.skills.map((skill, index) => (
                    <Tag key={index}>{skill.skillName}</Tag>
                ))}
            </View>
            <View style={{marginLeft: 20}}>
                <View style={styles.collapsibleTextFieldsContainer}>
                    <Text style={styles.textField}>Learnt From:</Text>
                    <Text style={{color: 'white'}}>
                        {props.superpower.learntFrom}
                    </Text>
                </View>

                {props.superpower.testimonials && (
                    <View style={{marginTop: 15}}>
                        <Text style={styles.textField}>Testimonials:</Text>
                        <View style={{marginLeft: 10}}>
                            {props.superpower.testimonials.map((val, index) => (
                                <Text key={index} style={styles.testimonials}>
                                    "{val}"
                                </Text>
                            ))}
                        </View>
                    </View>
                )}
            </View>

            <Icon name="chevron-up" size={15} style={styles.chevronIcon} />
        </Collapsible>
    );

    return (
        <View style={[{marginVertical: 5}, props.contentContainerStyle]}>
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={handleCollapsePress}>
                {renderCardHeader()}

                {toggleCollapse && (
                    <Icon
                        name="chevron-down"
                        size={15}
                        style={styles.chevronIcon}
                    />
                )}

                {renderCardBody()}
            </TouchableOpacity>
        </View>
    );
};

ProfileCollapsibleCard.propTypes = {
    profile: PropTypes.object.isRequired,
    superpower: PropTypes.object.isRequired,
    contentContainerStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: theme.COLOR_7,
        paddingTop: 10,
    },
    cardHeaderContainer: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingTop: 5,
    },
    cardHeaderDescription: {
        flex: 1,
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_1,
        color: 'white',
        fontFamily: 'Futura',
        marginLeft: 20,
        marginRight: 40,
    },
    vrule: {
        borderRightColor: theme.COLOR_4,
        borderRightWidth: 1,
    },
    requestBtn: {
        alignSelf: 'center',
        marginHorizontal: 20,
        height: '100%',
        justifyContent: 'center',
    },
    requestBtnText: {
        color: 'white',
        fontWeight: theme.FONT_WEIGHT_2,
    },
    collapsibleTagsContainer: {
        marginTop: 7,
        marginLeft: 16,
        marginRight: 40,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    collapsibleTextFieldsContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    textField: {
        color: 'white',
        fontWeight: theme.FONT_WEIGHT_3,
    },
    testimonials: {
        color: 'white',
        fontStyle: 'italic',
        fontFamily: 'Futura',
        marginTop: 10,
    },
    chevronIcon: {
        color: theme.COLOR_4,
        alignSelf: 'center',
        marginVertical: 5,
    },
});

export default ProfileCollapsibleCard;
