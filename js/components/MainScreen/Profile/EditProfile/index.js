import React, {useState} from 'react';
import {connect} from 'react-redux';

import {
    SafeAreaView,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
// Local Imports
import BackBtn from 'js/components/Global/NavigationBtn';
import {goToPrevScreen} from 'js/navigation/goToActions';
import SpecialTextInput from 'js/components/Global/SpecialTextInput';
import BigRedButton from 'js/components/Global/BigRedButton';
import theme from 'platonia_client/styles/theme';

import {updateProfile} from '../../../../redux/actions/user';

const EditProfile = props => {
    const imageDiameter = 100;
    const {height, width} = Dimensions.get('window');

    const [editable, setEditable] = useState(props.editable);
    const [username, setUserName] = useState(props.username);
    const [email, setEmail] = useState(props.email);
    const [phone, setPhone] = useState(props.phone);

    const updateUserProfile = () => {
        let user = {
            username: username,
            email: email,
            phone: phone,
        };

        props.dispatch(
            updateProfile(user, {
                onSuccess: () => {
                    goToPrevScreen(props.componentId);
                },
            }),
        );
    };

    const textFields = (
        <View
            style={[
                styles.formContainer,
                {marginBottom: editable ? 0.3 * height - 60 : 0.3 * height},
            ]}>
            <SpecialTextInput
                textFieldName="Name"
                placeholder={editable ? 'Please Enter your Name' : ''}
                placeholderTextColor={theme.COLOR_4}
                onChangeText={setUserName}
                value={username}
                editable={editable}
            />
            <SpecialTextInput
                textFieldName="Email"
                placeholder={editable ? 'Please Enter your Email' : ''}
                placeholderTextColor={theme.COLOR_4}
                onChangeText={setEmail}
                value={email}
                editable={editable}
                containerStyle={styles.inputField}
                keyboardType="email-address"
            />
            <SpecialTextInput
                textFieldName="Phone No."
                placeholder={editable ? 'Please Enter your Phone No.' : ''}
                placeholderTextColor={theme.COLOR_4}
                onChangeText={setPhone}
                value={phone}
                editable={editable}
                containerStyle={styles.inputField}
                keyboardType="phone-pad"
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbar}>
                {/* Back Button */}
                <BackBtn
                    text="Back"
                    textStyle={{marginLeft: 5}}
                    containerStyle={{marginLeft: 5}}
                    onPress={() => goToPrevScreen(props.componentId)}
                />
                {/* Edit Button */}
                <TouchableOpacity onPress={() => setEditable(!editable)}>
                    {editable ? (
                        <Icon name="times" style={styles.editIcon} size={15} />
                    ) : (
                        <Icon name="pen" style={styles.editIcon} size={15} />
                    )}
                </TouchableOpacity>
            </View>

            {/* User Image Card */}
            <View
                style={[
                    styles.profileImageContainer,
                    {height: imageDiameter, width: imageDiameter},
                ]}>
                <Image
                    source={{uri: props.profilePic || ' '}}
                    style={[styles.profileImage, {borderRadius: imageDiameter}]}
                />
            </View>
            {editable && (
                <View
                    style={[
                        styles.editImageButtonContainer,
                        {width: imageDiameter},
                    ]}>
                    <TouchableOpacity>
                        <Icon
                            name="pen"
                            style={styles.editImageButton}
                            size={15}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon
                            name="trash"
                            style={styles.editImageButton}
                            size={15}
                        />
                    </TouchableOpacity>
                </View>
            )}

            {textFields}

            {editable && (
                <BigRedButton onPress={updateUserProfile} active={true}>
                    Save
                </BigRedButton>
            )}
        </SafeAreaView>
    );
};

EditProfile.defaultProps = {
    editable: false,
};

EditProfile.propTypes = {
    username: PropTypes.string,
    editable: PropTypes.bool,
};

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLOR_1,
        alignItems: 'center',
    },
    editIcon: {
        color: 'white',
        padding: 5,
        marginRight: 25,
    },
    navbar: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileImageContainer: {
        marginTop: 0.1 * height,
    },
    profileImage: {
        flex: 1,
        height: null,
        width: null,
    },
    editImageButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    editImageButton: {
        color: 'white',
        padding: 5,
    },
    formContainer: {
        marginTop: 'auto',
        width: 0.8 * width,
    },
    inputField: {marginTop: 30},
});

export default connect()(EditProfile);
