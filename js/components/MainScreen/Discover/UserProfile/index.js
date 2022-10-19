import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

// Local Imports
import Tag from 'js/components/Global/Tag';
import ProfileCollapsibleCard from './ProfileCollapsibleCard';
import UserProfileCard from 'js/components/Global/UserProfileCard';
import {showOverlay} from 'js/navigation';
import theme from 'platonia_client/styles/theme';
import {getProfile} from '../../../../redux/actions/user';

const UserProfile = props => {
    const [profile, setProfile] = useState({});
    const dismiss = () => Navigation.dismissOverlay(props.componentId);

    const handleTagPress = tagName => {
        showOverlay('Discover.TagPressOverlay', {
            passProps: {
                tagName: tagName,
                stackComponentId: props.stackComponentId,
                parentOverlayDismiss: dismiss,
            },
        });
    };

    useEffect(() => {
        props.dispatch(
            getProfile(props.id, {
                onSuccess: res => {
                    setProfile(res);
                },
                onFailure: () => {},
            }),
        );
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                {/* Dismiss Profile View Button */}
                <TouchableOpacity
                    onPress={dismiss}
                    style={{
                        alignSelf: 'center',
                    }}>
                    <Icon
                        name="chevron-down"
                        size={20}
                        style={{color: 'white'}}
                    />
                </TouchableOpacity>

                <UserProfileCard
                    image={profile.profilePic}
                    imageDiameter={100}
                    containerStyle={{marginTop: 20}}>
                    <Text style={styles.userProfileHeadingText}>
                        {profile.username}
                    </Text>
                    <Text
                        style={
                            styles.userProfileSubHeadingText
                        }>{`Reputation Points: ${1300}`}</Text>
                </UserProfileCard>
            </View>

            {/* Body */}

            {/* Interested Skills */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentHeadingContainer1}>
                    <Text style={styles.contentHeadingText1}>
                        {"I'm interested in learning".toUpperCase()}
                    </Text>
                    <View style={styles.interestedSkillsContainer}>
                        {profile.skillsFollowed?.map((skill, index) => (
                            <Tag
                                key={index}
                                isTouchable={true}
                                onPress={() => handleTagPress(skill.skillName)}>
                                {skill.skillName}
                            </Tag>
                        ))}
                    </View>
                </View>

                {/* User's Superpowers */}
                <View style={styles.contentHeadingContainer2}>
                    <Text style={styles.contentHeadingText2}>
                        {'My Superpowers'.toUpperCase()}
                    </Text>
                    <Icon name="bolt" size={14} style={{color: 'yellow'}} />
                </View>

                {profile.superpowers?.map((superpower, index) => (
                    <ProfileCollapsibleCard
                        key={index}
                        profile={profile}
                        superpower={superpower}
                        contentContainerStyle={{marginTop: 5}}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

UserProfile.propTypes = {
    id: PropTypes.number.isRequired,
    stackComponentId: PropTypes.string.isRequired,
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: theme.COLOR_1,
    },
    headerContainer: {
        backgroundColor: theme.COLOR_3,
        paddingTop: 0.05 * height,
        paddingBottom: 20,
    },
    userProfileHeadingText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_2,
        marginBottom: 5,
    },
    userProfileSubHeadingText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_1,
    },
    contentHeadingContainer1: {
        marginVertical: 40,
        width: 0.9 * width,
        alignSelf: 'center',
    },
    contentHeadingText1: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_2,
    },
    interestedSkillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    contentHeadingContainer2: {
        width: 0.9 * width,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    contentHeadingText2: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_2,
        marginRight: 10,
        marginBottom: 10,
    },
});

export default connect()(UserProfile);
