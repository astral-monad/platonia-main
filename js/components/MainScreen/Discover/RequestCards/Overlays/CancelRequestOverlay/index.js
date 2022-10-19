import React, {useRef} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
// Local imports
import CancelSkillCard from './CancelSkillCard';
import theme from 'platonia_client/styles/theme';
import OverlayButton from 'js/components/Global/OverlayButton';
import {connect} from 'react-redux';
import {getUser} from '../../../../../../redux/selectors';
import {declineRequest} from '../../../../../../redux/actions/connections';

const CancelRequestOverlay = props => {
    const animationDuration = 500;

    const overlayRef = useRef();

    const dismiss = () => {
        overlayRef.current.fadeOutDown(animationDuration);
        setTimeout(() => {
            Navigation.dismissOverlay(props.componentId);
        }, animationDuration);
    };

    const onPressCancel = () => {
        let user = getUser();
        let request = {
            senderId: user.profile.id,
            receiverId: props.profile.id,
        };
        props.dispatch(
            declineRequest(request, {
                onSuccess: () => {
                    props.changeActionStatus();
                    dismiss();
                },
                onFailure: () => {},
            }),
        );
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
                    <CancelSkillCard {...props} />
                </TouchableOpacity>

                <OverlayButton
                    onPress={onPressCancel}
                    containerStyle={{
                        marginTop: 20,
                        backgroundColor: theme.COLOR_5,
                    }}
                    textStyle={{color: 'black'}}>
                    Cancel Request
                </OverlayButton>
            </Animatable.View>
        </TouchableOpacity>
    );
};

CancelRequestOverlay.propTypes = {
    profile: PropTypes.object.isRequired,
    superpower: PropTypes.object.isRequired,
    changeActionStatus: PropTypes.func.isRequired,
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

export default connect()(CancelRequestOverlay);
