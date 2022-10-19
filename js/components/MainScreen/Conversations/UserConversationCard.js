import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Navigation} from 'react-native-navigation';

class UserConversationCard extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                activeOpacity={this.props.activeOpacity}
                style={[
                    {
                        backgroundColor: '#333333',
                        paddingHorizontal: 20,
                        paddingVertical: 15,
                    },
                    this.props.containerStyle,
                ]}>
                <Text
                    style={[
                        {
                            color: 'white',
                        },
                        this.props.textStyle,
                    ]}>
                    {this.props.userName}
                </Text>
            </TouchableOpacity>
        );
    }
}

UserConversationCard.propTypes = {
    userName: PropTypes.string.isRequired,
    containerStyle: PropTypes.object,
    activeOpacity: PropTypes.number,
    textStyle: PropTypes.object,
    onPress: PropTypes.func,
};

export default UserConversationCard;
