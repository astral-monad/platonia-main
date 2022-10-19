import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
// Local imports
import {goToInviteFriendsScreen} from 'js/navigation/goToActions';
import theme from 'platonia_client/styles/theme';
import SmallRedButton from 'js/components/Global/SmallRedButton';

const PlaceholderScreen = props => (
    <View style={styles.container}>
        <Text style={styles.text}>
            Oops! We have no more users to display. Can you please help us get
            more? Pretty please?
        </Text>
        <SmallRedButton
            onPress={() => goToInviteFriendsScreen(props.componentId)}
            containerStyle={{backgroundColor: 'white', marginTop: 20}}
            textStyle={{color: 'black'}}>
            Invite Friends
        </SmallRedButton>
    </View>
);

PlaceholderScreen.propTypes = {componentId: PropTypes.string.isRequired};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        backgroundColor: theme.COLOR_1,
    },
    text: {
        color: 'white',
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_1,
        textAlign: 'center',
        width: 0.8 * width,
    },
});

export default PlaceholderScreen;
