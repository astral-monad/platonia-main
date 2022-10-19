import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
// Local Imports
import {
    goToLearnScreen,
    goToSuggestSuperpowerScreen,
    goToAddSuperpowers,
    goToPrevScreen,
} from '../../../navigation/gotoactions';
import CollapsibleSuperPower from './CollapsibleSuperPower';
import BigRedButton from '../../Global/BigRedButton';
import NavBtn from '../../Global/NavigationBtn';
import theme from '../../../../styles/theme';
import {
    getSuperpowers,
    updateSuperpowers,
} from '../../../redux/actions/superpowers';

/*
FIXME: Right now a scrollview is being used to display the list. If I use a Flatlist,
the individual component is slow. If I use a scrollview, the component mount seems to be slow.
*/

class ReviewSuperPowerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedSuperpowers: [],
        };
    }

    goToNextScreen = () => {
        let isFromSuggest = this.props.fromSuggest;
        this.state.updatedSuperpowers = this.state.updatedSuperpowers.filter(
            s => !s.removed,
        );

        if (this.state.updatedSuperpowers.length) {
            this.props.dispatch(
                updateSuperpowers(this.state.updatedSuperpowers, {
                    onSuccess: () => {
                        if (isFromSuggest && this.props.superpowers.length) {
                            goToLearnScreen();
                        } else {
                            goToSuggestSuperpowerScreen(this.props.componentId);
                        }
                    },
                }),
            );
        } else {
            if (isFromSuggest && this.props.superpowers.length) {
                goToLearnScreen();
            } else {
                goToSuggestSuperpowerScreen(this.props.componentId);
            }
        }
    };

    componentDidMount = () => {
        this.props.dispatch(
            getSuperpowers({
                onSuccess: () => {},
                onFailure: () => {},
            }),
        );
    };

    render = () => {
        let superPowerList = this.props.superpowers.map(superpower => (
            <CollapsibleSuperPower
                key={superpower.id}
                title={superpower.description}
                skills={superpower.skills}
                id={superpower.id}
                learntFrom={superpower.learntFrom}
                updatedSuperpowers={this.state.updatedSuperpowers}
            />
        ));

        return (
            <>
                <View style={styles.container}>
                    <SafeAreaView style={styles.headingContainer}>
                        {this.props.fromSuggest && (
                            <NavBtn
                                containerStyle={{
                                    alignSelf: 'flex-start',
                                    marginLeft: 10,
                                    marginBottom: 10,
                                }}
                                text="Back"
                                textStyle={{marginLeft: 5}}
                                onPress={goToPrevScreen}
                            />
                        )}
                        <Text style={styles.heading1}>
                            Review your Superpowers
                        </Text>

                        <Text style={styles.heading2}>
                            You can also do this later
                        </Text>
                    </SafeAreaView>

                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}>
                        {superPowerList}

                        {/* <FlatList
                        data={this.props?.superpowers}
                        renderItem={this.getCollapsibleCard}
                        keyExtractor={item => item.id}
                    /> */}

                        <TouchableOpacity
                            style={styles.addSuperpowersBtnContainer}
                            onPress={() =>
                                goToAddSuperpowers(this.props.componentId, {
                                    fromSuggest: this.props.fromSuggest,
                                })
                            }>
                            <Icon
                                name="plus"
                                size={15}
                                style={styles.addSuperpowersBtnIcon}
                            />
                            <Text style={{color: 'white'}}>
                                Add Superpowers
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <BigRedButton onPress={this.goToNextScreen}>Next</BigRedButton>
            </>
        );
    };
}

ReviewSuperPowerScreen.propTypes = {
    fromSuggest: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        superpowers: state.superpowers,
    };
}

export default connect(mapStateToProps)(ReviewSuperPowerScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLOR_1,
    },
    headingContainer: {
        backgroundColor: theme.COLOR_7,
        alignItems: 'center',
    },
    scrollContainer: {
        paddingTop: 30,
    },
    heading1: {
        fontSize: theme.FONT_SIZE_2,
        marginBottom: 10,
        color: 'white',
        fontWeight: theme.FONT_WEIGHT_2,
    },
    heading2: {
        color: theme.COLOR_4,
        marginBottom: 10,
    },
    addSuperpowersBtnContainer: {
        margin: 20,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addSuperpowersBtnIcon: {
        color: 'white',
        marginRight: 5,
    },
});
