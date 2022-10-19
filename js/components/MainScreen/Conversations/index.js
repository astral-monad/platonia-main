import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Navigation} from 'react-native-navigation';
// Local Imports
import UserConversationCard from './UserConversationCard';
import SearchBar from '../../Global/SearchBar';
import {goToUserChat} from '../../../navigation/gotoactions';
import {connect} from 'react-redux';

import {fetchConversations} from '../../../redux/actions/conversations';

class Conversations extends Component {
    constructor(props) {
        super(props);
        Promise.all([Icon.getImageSource('comments', 20, '#ffffff')]).then(
            sources => {
                Navigation.mergeOptions(this.props.componentId, {
                    bottomTab: {
                        text: 'Conversations',
                        textColor: '#ffffff50',
                        iconColor: '#ffffff50',
                        selectedTextColor: '#ffffffff',
                        selectedIconColor: '#ffffffff',
                        icon: sources[0],
                        fontSize: 12,
                        selectedFontSize: 20,
                    },
                });
            },
        );

        this.state = {
            searchText: '',
            conversations: [],
        };
    }

    onChangeSearchText = text => this.setState({searchText: text});

    componentDidMount() {
        // this.props.dispatch(
        //     fetchConversations({
        //         onSuccess: conversations => {
        //             this.setState({conversations});
        //         },
        //         onFailure: () => {},
        //     }),
        // );

        Navigation.events().registerBottomTabSelectedListener(
            ({selectedTabIndex}) => {
                if (selectedTabIndex === 1) {
                    //Conversations has the 1st index
                    this.props.dispatch(
                        fetchConversations({
                            onSuccess: conversations => {
                                this.setState({conversations});
                            },
                            onFailure: () => {},
                        }),
                    );
                }
            },
        );
    }

    render = () => {
        const width = Dimensions.get('window').width;

        return (
            <>
                <SafeAreaView
                    style={{
                        backgroundColor: '#333333',
                        padding: 20,
                        alignItems: 'center',
                    }}>
                    {/* Header */}
                    <SearchBar
                        containerStyle={{
                            width: 0.95 * width,
                            marginTop: 10,
                            marginBottom: 20,
                            borderRadius: 10,
                        }}
                        onChangeText={this.onChangeSearchText}
                    />
                </SafeAreaView>

                {/* Body */}
                <View style={{flex: 1, backgroundColor: '#181818'}}>
                    <ScrollView>
                        {this.state.conversations.map((conversation, index) => (
                            <UserConversationCard
                                key={index}
                                userName={conversation.name}
                                containerStyle={{marginTop: 20}}
                                activeOpacity={0.6}
                                textStyle={{fontSize: 17}}
                                onPress={() =>
                                    goToUserChat(this.props.componentId, {
                                        conversation: conversation,
                                    })
                                }
                            />
                        ))}
                    </ScrollView>
                </View>
            </>
        );
    };
}

export default connect()(Conversations);
