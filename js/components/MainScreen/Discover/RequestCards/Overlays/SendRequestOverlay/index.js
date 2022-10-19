import React, {useRef} from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {Navigation} from 'react-native-navigation';
// Local imports
import SkillCard from './SkillCard';
import {showOverlay} from 'js/navigation';
import theme from 'platonia_client/styles/theme';
import OverlayButton from '../../../../../Global/OverlayButton';

import {sendRequest} from '../../../../../../redux/actions/connections';
import {getUser} from '../../../../../../redux/selectors';

const SendRequestOverlay = props => {
    const animationDuration = 500;
    const overlayRef = useRef();

    const handleAddComment = () => {
        Navigation.dismissOverlay(props.componentId);
        showOverlay('Discover.AddCommentOverlay', {
            passProps: {...props},
            options: {overlay: {handleKeyboardEvents: true}},
        });
    };

    const dismiss = () => {
        overlayRef.current.fadeOutDown(animationDuration);
        setTimeout(() => {
            Navigation.dismissOverlay(props.componentId);
        }, animationDuration);
    };

    const onPressSend = () => {
        let user = getUser();
        let request = {
            senderId: user.profile.id,
            receiverId: props.profile.id,
            superpowerIds: [props.superpower.id],
            message: props.comment || '',
        };
        props.dispatch(
            sendRequest(request, {
                onSuccess: () => {
                    props.changeActionStatus();
                    dismiss();
                },
                onFailure: () => {},
            }),
        );
    };

    const comment = props.comment || '';
    const isCommentDefined = comment === '';
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
                <TouchableWithoutFeedback>
                    <View>
                        <SkillCard
                            text={props.superpower.description}
                            userName={props.profile.username}
                            containerStyle={{zIndex: 2}}
                        />

                        <View style={{alignItems: 'center'}}>
                            <View zIndex={1} style={styles.subCardContainer}>
                                <TouchableWithoutFeedback
                                    onPress={handleAddComment}>
                                    <Text
                                        style={{
                                            color: isCommentDefined
                                                ? theme.COLOR_4
                                                : 'black',
                                            marginHorizontal: 15,
                                        }}
                                        ellipsizeMode="tail"
                                        numberOfLines={2}>
                                        {isCommentDefined
                                            ? 'Add Comment...'
                                            : comment}
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <OverlayButton
                    onPress={onPressSend}
                    containerStyle={{
                        marginTop: 70,
                    }}>
                    Send Request
                </OverlayButton>
            </Animatable.View>
        </TouchableOpacity>
    );
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
    subCardContainer: {
        position: 'absolute',
        top: -10,
        backgroundColor: 'whitesmoke',
        paddingTop: 20,
        paddingBottom: 15,
        paddingHorizontal: 20,
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
});

export default connect()(SendRequestOverlay);
