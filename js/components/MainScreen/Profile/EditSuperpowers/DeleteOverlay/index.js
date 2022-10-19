import React, {useRef} from 'react';
import {Text, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
// Local Imports
import ContentCard from './ContentCard';
import theme from '../../../../../../styles/theme';
import OverlayButton from '../../../../Global/OverlayButton';

const DeleteSuperpowerOverlay = props => {
    const animationDuration = 500;
    const overlayRef = useRef();

    const dismiss = () => {
        overlayRef.current.fadeOutDown(animationDuration);
        setTimeout(() => {
            Navigation.dismissOverlay(props.componentId);
        }, animationDuration);
    };

    onPressDelete = () => {
        dismiss();
        props.onSuccess();
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
                    <ContentCard
                        superpowerDescription={props.superpowerDescription}
                    />
                </TouchableOpacity>

                <OverlayButton
                    onPress={onPressDelete}
                    containerStyle={{
                        marginTop: 20,
                        backgroundColor: theme.COLOR_5,
                    }}
                    textStyle={{color: 'black'}}>
                    Delete Superpower
                </OverlayButton>
            </Animatable.View>
        </TouchableOpacity>
    );
};

DeleteSuperpowerOverlay.propTypes = {
    containerStyle: PropTypes.object,
    onSuccess: PropTypes.func.isRequired,
    superpowerDescription: PropTypes.string.isRequired,
};

const {height, width} = Dimensions.get('window');
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

export default DeleteSuperpowerOverlay;
