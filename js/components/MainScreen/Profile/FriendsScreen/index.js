import React, {useState, useEffect} from 'react';
import {
    Platform,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Contacts from 'react-native-contacts';
// Local Imports
import SearchBar from 'js/components/Global/SearchBar';
import BackBtn from 'js/components/Global/NavigationBtn';
import {goToPrevScreen} from 'js/navigation/goToActions';
import ContactCard from './ContactCard';
import theme from 'platonia_client/styles/theme';

const FriendsScreen = props => {
    const [contacts, setContacts] = useState(null);
    const [inMemoryContacts, setInMemoryContacts] = useState(null);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            Contacts.getAll((err, contacts) => {
                if (err) {
                    throw err;
                } else {
                    setContacts(contacts);
                    setInMemoryContacts(contacts);
                }
            });
        }
    }, []);

    const onSearchContacts = searchText => {
        if (inMemoryContacts) {
            const filteredContacts = inMemoryContacts.filter(contact => {
                let fullContact = `${contact.givenName} ${contact.familyName}`;
                let contactLowerCase = fullContact.toLowerCase();
                let searchTermLowerCase = searchText.toLowerCase();
                return contactLowerCase.indexOf(searchTermLowerCase) > -1;
            });
            setContacts(filteredContacts);
        }
    };

    return (
        <>
            {/* Header */}
            <SafeAreaView style={styles.container}>
                <BackBtn
                    text="Back"
                    textStyle={{marginLeft: 5}}
                    containerStyle={{
                        alignSelf: 'flex-start',
                        marginLeft: 5,
                    }}
                    onPress={() => goToPrevScreen(props.componentId)}
                />

                <SearchBar
                    containerStyle={styles.searchBar}
                    maxLength={100}
                    onChangeText={onSearchContacts}
                />
            </SafeAreaView>

            {/* Contact List */}
            {/* FIXME: Assign Proper ID */}
            <ScrollView style={styles.scroll} keyboardDismissMode="on-drag">
                {contacts &&
                    contacts.map((val, index) => (
                        <ContactCard
                            key={index}
                            name={`${val.givenName} ${val.familyName}`}
                            phoneNumbers={val.phoneNumbers}
                        />
                    ))}
            </ScrollView>
        </>
    );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLOR_7,
        marginBottom: 'auto', //This is set to auto so that the header takes the minimum amount of space at the top. Better than setting height
    },
    searchBar: {
        width: 0.9 * width,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: theme.BORDER_RADIUS_2,
    },
    scroll: {
        backgroundColor: theme.COLOR_1,
        flex: 1,
        paddingTop: 10,
    },
});

export default FriendsScreen;
