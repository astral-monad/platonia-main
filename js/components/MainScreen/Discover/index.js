import React, {Component} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Dimensions,
    View,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';

// Local Imports
import UserView from './UserView';
import PlaceholderScreen from './PlaceholderScreen';
import NavBtn from '../../Global/NavigationBtn';
import SearchBar from '../../Global/SearchBar';
import theme from '../../../../styles/theme';
import {fetchRecommendations} from '../../../redux/actions/recommendations';

/*
This file primarily deals with the scroll functionality for each user view in discover tab
*/

/*
State Variables:
- scrollX: used for scrolling through multiple user profiles.
Stores the current position the user is at.
- this.props.recommendations.length: The number of user profiles which the user can scroll through at any given moment.
Works in tandem with scrollX
*/

class Discover extends Component {
    constructor(props) {
        super(props);
        // Fetch the icon required to be shown in the bottom tab and pass it to Navigation
        Promise.all([Icon.getImageSource('compass', 20, '#ffffff')]).then(
            sources => {
                Navigation.mergeOptions(this.props.componentId, {
                    bottomTab: {
                        text: 'Discover',
                        textColor: '#ffffff50',
                        iconColor: '#ffffff50',
                        selectedTextColor: '#ffffffff',
                        selectedIconColor: '#ffffffff',
                        icon: sources[0],
                        fontSize: theme.FONT_SIZE_0,
                        selectedFontSize: theme.FONT_SIZE_2,
                    },
                });
            },
        );

        this.state = {
            scrollX: 0,
        };
    }

    componentDidMount() {
        this.props.dispatch(
            fetchRecommendations({
                onSuccess: () => {},
                onFailure: () => {},
            }),
        );

        Navigation.events().registerBottomTabSelectedListener(
            ({selectedTabIndex}) => {
                if (selectedTabIndex === 0) {
                    //Discover has the 0th index
                    this.props.dispatch(
                        fetchRecommendations({
                            onSuccess: () => {},
                            onFailure: () => {},
                        }),
                    );
                }
            },
        );
    }

    componentDidUpdate(prevState, props) {
        /*
        If scrollX has changed scroll to new position
        */
        if (prevState.scrollX !== this.state.scrollX) {
            this.scrollViewRef.scrollTo({
                x: this.state.scrollX,
                animated: true,
            });
        }
    }

    scrollBack = () => {
        /*
        Scroll back if you are not at the first profile
        */
        const {width} = Dimensions.get('window');
        this.setState((prevState, props) => {
            if (!(prevState.scrollX === 0)) {
                return {scrollX: prevState.scrollX - width};
            }
        });
    };

    scrollNext = () => {
        /*
        Scroll to the next profile if you are not at the last profile
        */
        const {width} = Dimensions.get('window');
        this.setState((prevState, props) => {
            if (
                !(
                    prevState.scrollX ===
                    width * this.props.recommendations.length
                )
            ) {
                return {scrollX: prevState.scrollX + width};
            }
        });
    };

    render = () => {
        const {width} = Dimensions.get('window');
        return (
            <>
                {/* Header */}
                <SafeAreaView style={styles.navbarContainer}>
                    <View style={styles.navbar}>
                        <NavBtn
                            text="Back"
                            textStyle={{marginLeft: 5}}
                            containerStyle={{marginLeft: 5}}
                            onPress={this.scrollBack}
                        />
                        <NavBtn
                            text="Next"
                            iconSide="right"
                            iconName="chevron-right"
                            textStyle={{marginRight: 5}}
                            containerStyle={{marginRight: 5}}
                            onPress={this.scrollNext}
                        />
                    </View>
                    <SearchBar containerStyle={styles.searchbar} />
                </SafeAreaView>
                {/* Body */}
                <View style={styles.userviewContainer}>
                    <ScrollView
                        ref={ref => {
                            this.scrollViewRef = ref;
                        }}
                        scrollEnabled={false}
                        style={{flex: 1}}
                        horizontal
                        // snapToInterval={width}
                        // disableIntervalMomentum
                        disableScrollViewPanResponder
                        pagingEnabled
                        decelerationRate="fast">
                        {this.props.recommendations?.map((user, index) => (
                            <View style={{width: width}} key={index}>
                                <UserView
                                    componentId={this.props.componentId}
                                    profile={user}
                                />
                            </View>
                        ))}
                        <PlaceholderScreen
                            componentId={this.props.componentId}
                        />
                    </ScrollView>
                </View>
            </>
        );
    };
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    navbarContainer: {
        backgroundColor: theme.COLOR_1,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchbar: {
        width: 0.9 * width,
        alignSelf: 'center',
        borderRadius: theme.BORDER_RADIUS_2,
        marginBottom: 10,
        marginTop: 15,
    },
    userviewContainer: {
        flex: 1,
        backgroundColor: theme.COLOR_8,
    },
});

function mapStateToProps(state) {
    return {
        recommendations: state.recommendations,
    };
}

export default connect(mapStateToProps)(Discover);
