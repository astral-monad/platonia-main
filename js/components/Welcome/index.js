import React from 'react';
import {View, SafeAreaView, Text, Dimensions, StyleSheet} from 'react-native';
// Local Imports
import {goToAddSuperpowers} from '../../navigation/gotoactions';
import BigRedButton from '../Global/BigRedButton';
import theme from '../../../styles/theme';

const Welcome = props => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.textContainer}>
                <Text style={styles.heading}>Welcome</Text>
                <Text style={styles.subHeading}>
                    In the next steps, we’ll ask you about your superpowers.
                    Superpowers are any skills you have that might be of use to
                    someone else
                </Text>
            </SafeAreaView>
            <BigRedButton onPress={() => goToAddSuperpowers(props.componentId)}>
                Let's Go!
            </BigRedButton>
        </View>
    );
};

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: theme.COLOR_1,
    },
    textContainer: {
        marginTop: 0.15 * height,
        alignItems: 'center',
    },
    heading: {
        fontSize: theme.FONT_SIZE_5,
        fontWeight: theme.FONT_WEIGHT_2,
        color: 'white',
    },
    subHeading: {
        width: 0.8 * width,
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_1,
        color: 'white',
        marginTop: 0.1 * height,
        textAlign: 'center',
    },
});

export default Welcome;
