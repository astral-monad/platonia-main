import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
// Local Imports
import SendRequestCard from './RequestCards/SendRequestCard';
import ReceiveRequestCard from './RequestCards/ReceiveRequestCard';
import Tag from '../../Global/Tag';
import {showOverlay} from 'js/navigation';
import theme from 'platonia_client/styles/theme';

/*
This component hasn't been converted to hooks even though
it could have been because many changes involving lifecycle
components are anticipated here.
*/

/*
You are advised to read the docs for the ScrollView component before reading this code
Especially the following props:
- contentInset
- contentOffset
- onScrollEndDrag
- onMomentumScrollEnd
*/

/*
State Variables:
- insideScroll and outsideScroll: There are two ScrollViews nested in a user profile card.
One is used to change the card height relative to the user image.
The other is activated once the card has reached maximum height relative to user image.
*/

class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            insideScroll: false,
            outsideScroll: true,
        };
    }

    handleOutsideScroll = event => {
        /*
        Once the outside scroll view has scrolled to maximum height, disable outside scroll
        and enable inside scroll
        */
        if (event.nativeEvent.contentOffset.y === 0) {
            this.setState({
                insideScroll: true,
                outsideScroll: false,
            });
        }
    };

    handleInsideScroll = event => {
        /*
        Once the user pulls down on the inside scroll indicating he wants the card to scroll down,
        disable inside scroll and enable outside scroll
        */
        if (event.nativeEvent.contentOffset.y < 0) {
            this.setState({
                insideScroll: false,
                outsideScroll: true,
            });
        }
    };

    handleViewProfile = () => {
        /*
        Show overlay on pressing the view profile button
        */
        showOverlay('Discover.UserProfile', {
            passProps: {
                id: this.props.profile.id,
                stackComponentId: this.props.componentId,
            },
        });
    };

    handleTagPress = tagName => {
        /*
        Show overlay on pressing the tags in the interested skills section
        */
        showOverlay('Discover.TagPressOverlay', {
            passProps: {
                tagName: tagName,
                stackComponentId: this.props.componentId,
            },
        });
    };

    canAccept = () => {
        const canAcceptRequest =
            this.props.profile?.allowedActions?.filter(a => a === 'accept') ||
            [];

        return canAcceptRequest.length;
    };

    renderScrollCardContent = () => (
        /*
        Render the scrollable content inside the card on the user view
        */
        <>
            <Icon name="minus" style={styles.minusIcon} size={25} />
            {(this.canAccept() &&
            this.props.profile?.requestedSuperpowers?.length
                ? true
                : false) && (
                <View style={styles.receivedRequestsContainer}>
                    <Swiper
                        loop={false}
                        showsPagination={false}
                        nextButton={<Icon name="chevron-right" size={15} />}
                        prevButton={<Icon name="chevron-left" size={15} />}
                        showsButtons={true}>
                        {this.props.profile.requestedSuperpowers.map(
                            (val, index) => (
                                <ReceiveRequestCard
                                    key={index}
                                    profile={this.props.profile}
                                    requestedSuperpower={val}
                                    comment={this.props.profile.message}
                                    enableTouch
                                />
                            ),
                        )}
                    </Swiper>
                </View>
            )}

            <View style={styles.scrollCardHeadingContainer}>
                <Text style={styles.scrollCardHeadingText}>
                    {"I'm interested in learning".toUpperCase()}
                </Text>

                <View style={styles.interestedSkillsContainer}>
                    {this.props.profile.skillsFollowed.map((skill, index) => (
                        <Tag
                            key={index}
                            isTouchable={true}
                            onPress={() =>
                                this.handleTagPress(skill.skillName)
                            }>
                            {skill.skillName}
                        </Tag>
                    ))}
                </View>

                {this.props.profile.superpowers.map((val, index) => (
                    <SendRequestCard
                        superpower={val}
                        key={index}
                        profile={this.props.profile}
                    />
                ))}

                <View style={styles.hrule} />
                <TouchableOpacity
                    style={styles.viewProfileBtn}
                    onPress={this.handleViewProfile}>
                    <Text style={styles.viewProfileBtnText}>
                        View Full Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );

    render() {
        /*
        For how much you want the scrollCard to be tucked/pushed in i.e close to the bottom.
        The higher the value, the more pushed in it is.
        Used in parent ScrollView of nested ScrollView
        */
        const {height} = Dimensions.get('window');
        // const contentInset = 400;
        const contentInset = 0.45 * height;

        return (
            <>
                <Text style={styles.heading}>
                    {this.props.profile.username}
                </Text>
                <View style={styles.bodyContainer}>
                    <Image
                        source={{
                            uri: this.props.profile.profilePic || ' ',
                        }}
                        style={styles.userImage}
                    />
                    <View style={styles.parentScrollViewContainer}>
                        {/* flex=1 and bounce=true/false are very sensitive */}
                        <ScrollView
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.parentScrollView}
                            contentInset={{
                                top: contentInset,
                            }}
                            contentOffset={{
                                y: -contentInset,
                            }}
                            scrollEnabled={this.state.outsideScroll}
                            onMomentumScrollEnd={this.handleOutsideScroll}
                            onScrollEndDrag={this.handleOutsideScroll}>
                            <View style={{flex: 1}}>
                                <ScrollView
                                    // bounces={false}
                                    showsVerticalScrollIndicator={false}
                                    scrollEnabled={this.state.insideScroll}
                                    onMomentumScrollEnd={
                                        this.handleInsideScroll
                                    }
                                    onScrollEndDrag={this.handleInsideScroll}>
                                    {this.renderScrollCardContent()}
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </>
        );
    }
}

UserView.propTypes = {
    componentId: PropTypes.string.isRequired,
    requestedSuperpowers: PropTypes.array,
    profile: PropTypes.object.isRequired,
};

const styles = {
    minusIcon: {
        color: 'gray',
        alignSelf: 'center',
        position: 'absolute',
        top: 0,
        zIndex: 2,
    },
    receivedRequestsContainer: {
        height: 170, //Set after empirical observation
        borderTopLeftRadius: theme.BORDER_RADIUS_2,
        borderTopRightRadius: theme.BORDER_RADIUS_2,
        overflow: 'hidden',
    },
    heading: {
        fontSize: theme.FONT_SIZE_4,
        fontWeight: theme.FONT_WEIGHT_3,
        color: 'white',
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    bodyContainer: {
        flex: 1,
    },
    userImage: {
        flex: 1,
        height: null,
        width: null,
    },
    parentScrollViewContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginHorizontal: 20,
        height: '95%',
        overflow: 'hidden',
    },
    parentScrollView: {
        flex: 1,
        backgroundColor: theme.COLOR_1,
        borderTopLeftRadius: theme.BORDER_RADIUS_2,
        borderTopRightRadius: theme.BORDER_RADIUS_2,
    },
    scrollCardHeadingContainer: {paddingHorizontal: 20, marginTop: 20, flex: 1},
    scrollCardHeadingText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_2,
    },
    interestedSkillsContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    hrule: {
        marginVertical: 10,
        marginHorizontal: 5,
        borderBottomColor: theme.COLOR_7,
        borderBottomWidth: 2,
    },
    viewProfileBtn: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    viewProfileBtnText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        fontWeight: theme.FONT_WEIGHT_2,
    },
};

export default UserView;
