import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const UserProfileCard = props => (
    <View style={[styles.container, props.containerStyle]}>
        {/* Image */}
        <View
            style={{
                height: props.imageDiameter,
                width: props.imageDiameter,
            }}>
            <Image
                source={{uri: props.image || ' '}}
                style={[styles.image, {borderRadius: props.imageDiameter}]}
            />
        </View>

        {/* Text */}
        <View style={[styles.textContainer, props.textContainerStyle]}>
            {props.children}
        </View>
    </View>
);

UserProfileCard.propTypes = {
    image: PropTypes.string,
    imageDiameter: PropTypes.number.isRequired,
    containerStyle: PropTypes.object,
    textContainerStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '80%',
    },
    image: {
        flex: 1,
        height: null,
        width: null,
    },
    textContainer: {flex: 1, paddingHorizontal: 20, paddingVertical: 10},
});

export default UserProfileCard;
