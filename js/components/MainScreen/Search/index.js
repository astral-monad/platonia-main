import React, {useState} from 'react';
import {
    TouchableOpacity,
    TextInput,
    View,
    StyleSheet,
    ScrollView,
    Text,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {showOverlay} from '../../../navigation';

// Local Imports
import theme from 'platonia_client/styles/theme';
import {Navigation} from 'react-native-navigation';
import {fetchedSearchedRecommendations} from '../../../client/recommendations';

const SearchOverlay = props => {
    const [searchText, setSearchText] = useState('');
    const [profiles, setSearchedProfiles] = useState([]);

    const handleOnChangeText = text => {
        setSearchText(text);
        fetchedSearchedRecommendations(text).then(res => {
            setSearchedProfiles(res.data?.profiles || []);
        });
    };

    const dismissOverlay = () => {
        Navigation.dismissOverlay(props.componentId);
    };

    const clearText = () => {
        setSearchText('');
    };

    const onPress = id => {
        showOverlay('Discover.UserProfile', {
            passProps: {
                id: id,
                stackComponentId: props.componentId,
            },
        });
    };

    return (
        <View style={styles.container}>
            <SafeAreaView
                style={{
                    backgroundColor: '#333333',
                    padding: 20,
                    alignItems: 'center',
                }}>
                <View style={[styles.searchBar, props.containerStyle]}>
                    <Icon
                        name="arrow-left"
                        style={{
                            color: props.placeholderColor || theme.COLOR_4,
                        }}
                        onPress={dismissOverlay}
                    />
                    <View
                        style={[
                            styles.textInputContainer,
                            props.textInputContainerStyle,
                        ]}>
                        <TextInput
                            autoFocus={true}
                            style={[{color: 'white'}, props.textInputStyle]}
                            onChangeText={handleOnChangeText}
                            placeholder={props.placeholder}
                            placeholderTextColor={
                                props.placeholderColor || theme.COLOR_4
                            }
                            keyboardAppearance="dark"
                            maxLength={props.maxLength}
                            value={searchText}
                            autoCapitalize="words"
                            textContentType="name"
                        />
                    </View>
                    {searchText !== '' && (
                        <TouchableOpacity
                            onPress={clearText}
                            style={styles.clearBtn}>
                            <Icon
                                name="times"
                                size={15}
                                style={styles.clearBtnIcon}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </SafeAreaView>

            <View style={{flex: 1}}>
                <ScrollView>
                    {profiles.map((profile, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                onPress(profile.value.id);
                            }}
                            key={index}
                            style={{
                                backgroundColor: '#333333',
                                paddingHorizontal: 20,
                                paddingVertical: 15,
                                borderTopWidth: 2,
                                borderBottomWidth: 2,
                                borderColor: '#000',
                                borderRadius: 2,
                            }}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 17,
                                }}>
                                {profile.value.username}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

SearchOverlay.defaultProps = {
    placeholder: '',
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLOR_6,
        flex: 1,
    },
    searchBar: {
        backgroundColor: theme.COLOR_3,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    textInputContainer: {
        marginLeft: 10,
        flex: 1,
    },
    clearBtn: {
        paddingHorizontal: 5,
        marginLeft: 5,
    },
    clearBtnIcon: {color: theme.COLOR_4},
});

export default SearchOverlay;
