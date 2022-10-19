import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Local imports
import ReceiveRequestCard from '../../ReceiveRequestCard';
import ExchangeRequestCard from './ExchangeRequestCard';
import theme from 'platonia_client/styles/theme';
import BigRedButton from 'js/components/Global/BigRedButton';
import {acceptRequest} from '../../../../../../redux/actions/connections';
import {getUser} from '../../../../../../redux/selectors';

class ReceiveRequestOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedExchange: [],
        };
    }

    dismiss = () => Navigation.dismissOverlay(this.props.componentId);

    setSelectedExchange = (superpowerId, add) => {
        let superpowers = this.state.selectedExchange;
        if (add) {
            superpowers.push(superpowerId);
        } else {
            superpowers = superpowers.filter(s => s !== superpowerId);
        }
        this.setState({selectedExchange: superpowers});
    };

    handleOnAccept = () => {
        let user = getUser();
        let request = {
            senderId: this.props.profile.id,
            receiverId: user.profile.id,
            superpowerIds: this.state.selectedExchange,
        };

        this.props.dispatch(
            acceptRequest(request, {
                onSuccess: () => {
                    this.dismiss();
                },
                onFailure: () => {},
            }),
        );
    };

    render = () => {
        return (
            <TouchableOpacity
                style={styles.container}
                activeOpacity={1}
                onPress={this.dismiss}>
                <TouchableWithoutFeedback>
                    <View style={styles.cardContainer}>
                        <View style={styles.scrollViewContainer}>
                            <ScrollView
                                // bounces={false}
                                contentInset={{bottom: 20}}>
                                {/*
                                    The following enclosing view is necessary because the enclosing TouchableFeedback
                                    disables the ScrollView. By setting onStartShouldSetResponder we make sure
                                    that when the user clicks on the ScrollView the ScrollView gets control of
                                    the gesture
                                */}
                                <View
                                    onStartShouldSetResponder={() => true}
                                    style={{flex: 1}}>
                                    <View
                                        style={{
                                            marginBottom: 'auto',
                                        }}>
                                        <ReceiveRequestCard
                                            profile={this.props.profile}
                                            requestedSuperpower={
                                                this.props.requestedSuperpower
                                            }
                                            comment={this.props.comment}
                                            numberOfLines_superpower={-1}
                                            numberOfLines_comment={-1}
                                            commentTextStyle={{color: 'black'}}
                                        />
                                    </View>

                                    <View style={styles.bodyContainer}>
                                        <View style={styles.headingContainer}>
                                            {/* Header */}
                                            <Text style={styles.headingText}>
                                                Select one of{' '}
                                                {this.props.profile.username}
                                                's superpowers to exchange:
                                            </Text>
                                        </View>
                                        {/* Body */}
                                        <View
                                            style={
                                                styles.superpowerCardsContainer
                                            }>
                                            {this.props.profile.superpowers.map(
                                                (val, index) => (
                                                    <ExchangeRequestCard
                                                        key={index}
                                                        superpower={val}
                                                        onSelect={
                                                            this
                                                                .setSelectedExchange
                                                        }
                                                    />
                                                ),
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <BigRedButton onPress={this.handleOnAccept}>
                            Accept Request
                        </BigRedButton>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        );
    };
}

ReceiveRequestOverlay.propTypes = {
    profile: PropTypes.object.isRequired,
    requestedSuperpower: PropTypes.object.isRequired,
    comment: PropTypes.string,
};

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLOR_6,
        justifyContent: 'flex-end',
    },
    cardContainer: {justifyContent: 'flex-end', height: 0.6 * height},
    scrollViewContainer: {
        backgroundColor: theme.COLOR_1,
        height: '100%',
    },
    bodyContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    headingContainer: {
        marginTop: 15,
    },
    headingText: {
        color: 'white',
        fontWeight: theme.FONT_WEIGHT_2,
        fontSize: theme.FONT_SIZE_2,
    },
    superpowerCardsContainer: {
        flex: 1,
        marginTop: 15,
    },
});

export default connect()(ReceiveRequestOverlay);
