import React, {useState, useRef} from 'react';
import {TouchableOpacity, Dimensions, Keyboard, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// Local Imports
import ContentCard from './ContentCard';
import OverlayButton from 'js/components/Global/OverlayButton';
import {addSuperpower} from 'js/redux/actions/superpowers';
import theme from 'platonia_client/styles/theme';

/*
State Variables:
- textFields: Object containing superpower's descriptioon, tags, learntFrom.
Why have I created a singlee object and not 3 diff state variables? Because I need to pass
this down to a child component and it's simpler this way.

Other:
animationDuration: Controls duration of fadeUp and fadeDown
*/
const SuperpowerOverlay = props => {
    const animationDuration = 500;
    const [textFields, setTextFields] = useState({
        description: `I can teach you ${props.tagName.toLowerCase()}`,
        tags: [props.tagName],
        learntFrom: '',
    });

    const overlayRef = useRef();

    const dismiss = () => {
        /*
        To dismiss an overlay you need to execute Navigation.dismissOverlay
        But doing just that would be abrupt. That's why the animation is triggered first
        and then the overlay is dismissed
        */
        overlayRef.current.fadeOutDown(animationDuration);
        setTimeout(() => {
            Navigation.dismissOverlay(props.componentId);
        }, animationDuration);
    };

    const addSuperpowerRedux = onSuccess => {
        props.dispatch(
            addSuperpower(
                textFields.description,
                textFields.tags,
                textFields.learntFrom,
                {onSuccess},
            ),
        );
    };

    const onPressDone = () => {
        /*
        Dispatch to redux and on success dismiss and call any parent callbacks
        */
        addSuperpowerRedux(superpowerObj => {
            dismiss();
            if (props.onSuccess) {
                props.onSuccess(superpowerObj);
            }
        });
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
                <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
                    <ContentCard
                        textFields={textFields}
                        setParentState={setTextFields}
                    />
                </TouchableOpacity>

                <OverlayButton
                    onPress={onPressDone}
                    containerStyle={{
                        marginTop: 20,
                    }}>
                    Done
                </OverlayButton>
            </Animatable.View>
        </TouchableOpacity>
    );
};

SuperpowerOverlay.propTypes = {
    tagName: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
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
        width: 0.95 * width,
    },
});

export default connect()(SuperpowerOverlay);
