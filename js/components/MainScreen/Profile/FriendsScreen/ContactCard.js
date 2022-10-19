import React from 'react';
import {Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
// Local Imports
import theme from 'platonia_client/styles/theme';

const ContactCard = props => {
    const defaultMessage = 'Check out this cool app called Platonia';
    const onContactPress = () => {
        let phone = props.phoneNumbers[0].number;

        let url1 = `whatsapp://send?text=${defaultMessage}&phone=${phone}`;
        let url2 = `http://api.whatsapp.com/send?text=${defaultMessage}&phone=${phone}`;
        let url3 = `sms:${phone}&body=${defaultMessage}&`;

        Linking.canOpenURL(url1)
            .then(() => Linking.openURL(url1))
            .catch(() => Linking.openURL(url2))
            .catch(() => Linking.openURL(url3));
    };

    return (
        <TouchableOpacity
            onPress={onContactPress}
            activeOpacity={0.5}
            style={styles.container}>
            <Text style={styles.contactName}>{props.name}</Text>
            <Text style={styles.inviteText}>Invite</Text>
        </TouchableOpacity>
    );
};

ContactCard.propTypes = {
    name: PropTypes.string.isRequired,
    phoneNumbers: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLOR_7,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginVertical: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contactName: {color: 'white', fontSize: theme.FONT_SIZE_1},
    inviteText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_0,
        fontWeight: theme.FONT_WEIGHT_3,
    },
});

export default ContactCard;
