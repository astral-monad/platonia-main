import React, {Component} from 'react';
import io from 'socket.io-client';
import {getAccessToken} from '../../../../client/utils';
import {connect} from 'react-redux';

import {fetchConversation} from '../../../../redux/actions/conversations';
import {getUser} from '../../../../redux/selectors';

import {
    SafeAreaView,
    Dimensions,
    Platform,
    View,
    ActivityIndicator,
} from 'react-native';
import {
    GiftedChat,
    Bubble,
    InputToolbar,
    Composer,
} from 'react-native-gifted-chat';
// Local Imports
import NavBtn from '../../../Global/NavigationBtn';
import {goToPrevScreen} from '../../../../navigation/gotoactions';

// Refer to react-native-gifted-chat docs for help

class UserChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: [
                {
                    _id: 0,
                    text: 'Beginning of your conversation with this user',
                    createdAt: new Date().getTime(),
                    system: true,
                },
            ],
        };
    }

    componentDidMount() {
        this.props.dispatch(
            fetchConversation(this.props.conversation?.id, {
                onSuccess: conversation => {
                    conversation = conversation.map(c => {
                        let obj = {
                            _id: c.id,
                            createdAt: c.createdAt,
                            text: c.Message?.message,
                            user: {
                                _id: c.Message?.Profile?.id,
                                name: c.Message?.Profile?.username,
                                avatar: c.Message?.Profile?.profilePic || '',
                            },
                        };

                        return obj;
                    });

                    let messages = [...this.state.messages, ...conversation];
                    this.setState({messages});
                },
                onFailure: () => {},
            }),
        );

        this.socket = io('https://api.platonia.network', {
            query: {
                token: getAccessToken(),
                conversationId: this.props.conversation?.id,
            },
        });

        this.socket.on('message', (msg = {}) => {
            let obj = {
                _id: msg.id,
                createdAt: msg.createdAt,
                text: msg.Message?.message,
                user: {
                    _id: msg.Message?.Profile?.id,
                    name: msg.Message?.Profile?.username,
                    avatar: msg.Message?.Profile?.profilePic || '',
                },
            };

            this.setState({messages: [...this.state.messages, obj]});
        });
    }

    handleSend = (newMessage = []) => {
        this.socket.emit('message', {
            message: newMessage,
        });

        this.setState({
            messages: GiftedChat.append(newMessage, this.state.messages),
        });
    };

    isIphoneX = () => {
        const dimen = Dimensions.get('window');
        return (
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            (dimen.height === 812 ||
                dimen.width === 812 ||
                (dimen.height === 896 || dimen.width === 896))
        );
    };

    renderBubble = props => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#333333',
                    },
                    right: {
                        backgroundColor: 'rgb(10,132,255)',
                    },
                }}
                textStyle={{
                    left: {
                        color: '#ffffff',
                    },
                    right: {
                        color: '#ffffff',
                    },
                }}
            />
        );
    };

    goBack = () => {
        this.socket.disconnect();
        goToPrevScreen(this.props.componentId);
    };

    renderComposer = props => {
        return <Composer {...props} textInputStyle={{color: 'white'}} />;
    };

    renderInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{backgroundColor: '#404040'}}
            />
        );
    };

    renderLoading = () => {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <ActivityIndicator size="large" color="#6646ee" />
            </View>
        );
    };

    render() {
        let user = getUser();
        let chatUser = {
            _id: user.profile.id,
            name: user.profile.username,
            avatar: user.profile.profilePic || '',
        };

        return (
            <SafeAreaView style={{backgroundColor: '#181818', flex: 1}}>
                <NavBtn
                    iconName="chevron-left"
                    onPress={this.goBack}
                    text="Back"
                    containerStyle={{
                        marginRight: 'auto',
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                    }}
                    textStyle={{marginLeft: 5}}
                />
                <GiftedChat
                    messages={this.state.messages}
                    onSend={newMessage => this.handleSend(newMessage)}
                    user={chatUser}
                    bottomOffset={this.isIphoneX() && 83}
                    textInputProps={{keyboardAppearance: 'dark'}}
                    renderBubble={this.renderBubble}
                    placeholder="Type your message here..."
                    renderInputToolbar={this.renderInputToolbar}
                    renderComposer={this.renderComposer}
                    inverted={false}
                    renderLoading={this.renderLoading}
                />
            </SafeAreaView>
        );
    }
}

export default connect()(UserChat);
