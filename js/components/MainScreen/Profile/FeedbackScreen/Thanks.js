import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
// Local Imports
import NavBtn from '../../../Global/NavigationBtn';
import {goBackToRoot} from '../../../../gotoactions';
import theme from '../../../../../styles/theme';

const Thanks = props => (
    <SafeAreaView style={styles.container}>
        <NavBtn
            iconName="chevron-left"
            onPress={() => goBackToRoot(props.componentId)}
            text="Back"
            containerStyle={styles.backBtn}
            textStyle={{marginLeft: 5}}
        />
        <View style={styles.textContainer}>
            <Text style={styles.heading1}>Thank you!</Text>
            <Text style={styles.heading2}>
                Your feedback has reached us successfully
            </Text>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.COLOR_1},
    backBtn: {
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading1: {
        color: 'white',
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_2,
    },
    heading2: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        marginTop: 20,
        fontWeight: theme.FONT_WEIGHT_1,
    },
});

export default Thanks;
