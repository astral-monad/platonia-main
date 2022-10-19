import React from 'react';
import {StyleSheet, Text} from 'react-native';
// Local Imports
import theme from 'platonia_client/styles/theme';

const PlatoniaLogo = () => {
    return <Text style={styles.platoniaLogo}>Platonia</Text>;
};

const styles = StyleSheet.create({
    platoniaLogo: {
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_1,
        color: '#fff',
    },
});

export default PlatoniaLogo;
