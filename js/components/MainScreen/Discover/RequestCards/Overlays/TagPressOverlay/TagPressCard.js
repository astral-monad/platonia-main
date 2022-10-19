import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
// Local Imports
import {
    goToAddSuperpowerFromTagPressOverlay,
    goToInviteFriendsScreen,
} from '../../../../../../navigation/goToActions';
import theme from '../../../../../../../styles/theme';

const TagPressCard = props => {
    const onPressAddSuperpower = () => {
        props.dismissOverlay();
        goToAddSuperpowerFromTagPressOverlay(
            props.stackComponentId,
            props.tagName.toLowerCase(),
        );
    };

    const onPressInviteFriends = () => {
        props.dismissOverlay();
        goToInviteFriendsScreen(props.stackComponentId);
    };

    return (
        <View style={[styles.container, props.containerStyle]}>
            {/* Header */}
            <View style={styles.header}>
                <Icon name="bolt" size={15} style={{color: 'yellow'}} />
                <Text style={styles.headerText}>Superpower Actions</Text>
            </View>
            {/* Content */}
            <TouchableOpacity
                onPress={onPressAddSuperpower}
                style={styles.addSuperpowerBtn}>
                <Text style={styles.btnText1}>
                    Add <Text style={styles.btnText2}>{props.tagName}</Text> to
                    your list of superpowers
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onPressInviteFriends}
                style={styles.inviteFriendsBtn}>
                <Text style={styles.btnText1}>
                    Invite a friend who knows{' '}
                    <Text style={styles.btnText2}>{props.tagName}</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

TagPressCard.propTypes = {
    tagName: PropTypes.string.isRequired,
    dismissOverlay: PropTypes.func.isRequired,
    stackComponentId: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLOR_7,
        padding: 20,
        borderRadius: theme.BORDER_RADIUS_2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_3,
        marginLeft: 7,
    },
    addSuperpowerBtn: {
        marginTop: 20,
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: theme.BORDER_RADIUS_1,
        padding: 10,
    },
    btnText1: {
        color: 'white',
        fontWeight: theme.FONT_WEIGHT_2,
    },
    btnText2: {
        fontWeight: theme.FONT_WEIGHT_3,
        fontSize: theme.FONT_SIZE_1,
    },
    inviteFriendsBtn: {
        marginVertical: 15,
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: theme.BORDER_RADIUS_1,
        padding: 10,
    },
});

export default TagPressCard;
