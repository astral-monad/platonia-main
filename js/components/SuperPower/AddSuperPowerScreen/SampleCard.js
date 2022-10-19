import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
// Local Imports
import Tag from 'js/components/Global/Tag';
import theme from 'platonia_client/styles/theme';

/*
This nested View soup was necessary because of the varying 
flexDirections necessary for the individual components here.
*/
const SampleCard = props => (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={props.image} />
        </View>
        <View
            style={{
                flex: 1,
            }}>
            <View style={styles.header}>
                <Text style={styles.textColor}>{props.title}</Text>
            </View>
            <View style={styles.footer}>
                <View>
                    <Text style={styles.textColor}>{props.subtitle}</Text>
                </View>
                <View style={styles.tagsContainer}>
                    {props.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </View>
            </View>
        </View>
    </View>
);

SampleCard.propTypes = {
    image: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
};

const {height, width} = Dimensions.get('window');

const heightOfSampleCard = 0.09 * height;
const widthOfSampleCard = 0.95 * width;
const borderRadius = theme.BORDER_RADIUS_1;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        backgroundColor: theme.COLOR_3,
        flexDirection: 'row',
        width: widthOfSampleCard,
        height: heightOfSampleCard,
        borderRadius: borderRadius,
        overflow: 'hidden',
        // shadowColor: '#000',
        // shadowOffset: {width: 3, height: 3},
        // shadowOpacity: 0.3,
        // shadowRadius: 5,
    },
    imageContainer: {
        height: heightOfSampleCard,
        width: heightOfSampleCard,
    },
    image: {
        flex: 1,
        height: null,
        width: null,
    },
    header: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 15,
        marginRight: 5,
    },
    footer: {
        flexDirection: 'row',
        marginTop: 'auto',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 5,
    },
    tagsContainer: {
        flexDirection: 'row',
    },
    textColor: {
        color: 'white',
    },
});

export default SampleCard;
