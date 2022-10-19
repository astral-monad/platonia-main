import React, {useRef} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
// Local imports
import TagPressCard from './TagPressCard';
import theme from 'platonia_client/styles/theme';

const TagPressOverlay = props => {
    const animationDuration = 500;

    const overlayRef = useRef();

    const dismiss = () => {
        overlayRef.current.fadeOutDown(animationDuration);
        setTimeout(() => {
            Navigation.dismissOverlay(props.componentId);
            // If there is a parent overlay over this overlay (eg. Discover.UserProfile)
            if (props.parentOverlayDismiss) props.parentOverlayDismiss();
        }, animationDuration);
    };

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={dismiss}>
            <Animatable.View
                ref={overlayRef}
                animation="fadeInUp"
                duration={animationDuration}
                style={styles.cardContainer}>
                {/* Header */}
                <TouchableOpacity activeOpacity={1}>
                    <TagPressCard {...props} dismissOverlay={dismiss} />
                </TouchableOpacity>
            </Animatable.View>
        </TouchableOpacity>
    );
};

TagPressOverlay.propTypes = {
    tagName: PropTypes.string.isRequired,
    stackComponentId: PropTypes.string.isRequired,
    parentOverlayDismiss: PropTypes.func,
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.COLOR_6,
    },
    cardContainer: {
        width: 0.85 * width,
    },
});

export default TagPressOverlay;
