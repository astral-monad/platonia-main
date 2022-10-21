import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addSuperpower} from '../../../redux/actions/superpowers';
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TouchableWithoutFeedback,
    ScrollView,
    Dimensions,
    Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
// Local Imports
import {
    goToPrevScreen,
    goToReviewSuperpowerScreen,
    goToSuggestSuperpowerScreenFromProfile,
} from '../../../navigation/goToActions';
import SampleCard from './SampleCard';
import TagInput from '../../Global/TagInput';
import NavBtn from '../../Global/NavigationBtn';
import theme from '../../../../styles/theme';
import SmallRedButton from '../../Global/SmallRedButton';

const defaultPlaceholder = 'I can teach how to ';

// This code has not been converted to hooks because it needs componentDidUpdate.
// Creating the same functionality with hooks would become more convoluted than the current code
class AddSuperPowerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.predefinedSuperpower
                ? `I can teach ${this.props.predefinedSuperpower}`
                : defaultPlaceholder,
            tags: [],
            activateDoneBtn: false,
        };
    }

    areArraysEqual = (a, b) => {
        if (a.length !== b.length) {
            return false;
        } else {
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        }
    };

    componentDidUpdate(prevProps, prevState) {
        /*
        Check if the description or the tags have been modified.
        This is used to set the activateDoneBtn state variable
        which controls whether the done button can be pressed or not.
        */
        if (
            prevState.description !== this.state.description ||
            !this.areArraysEqual(prevState.tags, this.state.tags)
        ) {
            if (
                this.state.tags.length !== 0 &&
                !(
                    this.state.description.trim() ===
                        defaultPlaceholder.trim() ||
                    this.state.description.trim() === ''
                )
            ) {
                this.setState({activateDoneBtn: true});
            } else {
                this.setState({activateDoneBtn: false});
            }
        }
    }

    handleSuperpowerDescription = text => this.setState({description: text});

    handleSuperpowerTags = newTags => this.setState({tags: newTags});

    goToNextScreen = () => {
        /*
        This won't be activated on all cases. Done button will be activated only if activateDoneButton
        is true and only then will this function be called on pressing the done button
        */
        this.props.dispatch(
            addSuperpower(this.state.description, this.state.tags, '', {
                onSuccess: () => {
                    if (this.props.fromProfile) {
                        goToPrevScreen(this.props.componentId);
                    } else {
                        goToReviewSuperpowerScreen(this.props.componentId, {
                            fromSuggest: this.props.fromSuggest,
                        });
                    }
                },
            }),
        );
    };

    render = () => {
        return (
            <>
                <TouchableWithoutFeedback
                    style={{flex: 1}}
                    onPress={Keyboard.dismiss}>
                    <SafeAreaView style={styles.container}>
                        <NavBtn
                            text="Back"
                            textStyle={{marginLeft: 5}}
                            containerStyle={styles.backBtn}
                            onPress={() =>
                                goToPrevScreen(this.props.componentId)
                            }
                        />

                        {/* Header */}
                        <Text style={styles.headingText}>Add Superpower</Text>

                        {/* Body */}
                        <View style={styles.formContainer}>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    value={this.state.description}
                                    onChangeText={
                                        this.handleSuperpowerDescription
                                    }
                                    style={styles.textInput}
                                    keyboardAppearance="dark"
                                    maxLength={280}
                                />

                                <View style={styles.hruleContainer}>
                                    <View style={styles.hrule} />
                                    <Text style={styles.hruleText}>
                                        Add Tags
                                    </Text>
                                    <View style={styles.hrule} />
                                </View>

                                <TagInput
                                    handleTags={this.handleSuperpowerTags}
                                    style={styles.textInput}
                                    maxLength={50}
                                    placeholder="Add words separated by commas"
                                />
                            </View>

                            <SmallRedButton
                                containerStyle={styles.doneBtn}
                                active={this.state.activateDoneBtn}
                                onPress={this.goToNextScreen}>
                                Done
                            </SmallRedButton>

                            {/* Displayed only if you arrive from profile screen */}
                            {this.props.fromProfile && (
                                <TouchableOpacity
                                    onPress={() =>
                                        goToSuggestSuperpowerScreenFromProfile(
                                            this.props.componentId,
                                        )
                                    }
                                    style={styles.suggestButton}>
                                    <Text style={styles.suggestButtonText}>
                                        Would you like to see some suggestions?
                                    </Text>
                                    <Icon name="arrow-right" size={17} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>

                <SafeAreaView style={styles.scrollContainer}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <SampleCard
                            image={require('../../../../assets/images/roger.jpg')}
                            title="I can teach you how to hit a ball with a tennis racquet"
                            subtitle="Roger Federer"
                            tags={['sports', 'tennis']}
                        />
                        <SampleCard
                            image={require('../../../../assets/images/magnus.jpeg')}
                            title="I can teach you chess"
                            subtitle="Magnus Carlsen"
                            tags={['sports', 'chess']}
                        />
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    };
}

AddSuperPowerScreen.propTypes = {
    predefinedSuperpower: PropTypes.string,
    fromProfile: PropTypes.bool,
};

export default connect()(AddSuperPowerScreen);

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.COLOR_1,
    },
    headingText: {
        fontSize: theme.FONT_SIZE_3,
        fontWeight: theme.FONT_WEIGHT_2,
        marginTop: 20,
        marginBottom: 0.05 * height,
        color: 'white',
    },
    backBtn: {marginLeft: 5, alignSelf: 'flex-start'},
    formContainer: {
        width: 0.8 * width,
    },
    textInputContainer: {
        backgroundColor: theme.COLOR_3,
        borderRadius: 2,
    },
    textInput: {
        margin: 15,
        color: 'white',
    },
    hruleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    hrule: {
        borderWidth: 0.5,
        borderColor: theme.COLOR_4,
        flex: 1,
        alignSelf: 'center',
    },
    hruleText: {
        color: theme.COLOR_4,
        fontSize: theme.FONT_SIZE_0,
        marginHorizontal: 10,
    },
    doneBtn: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    scrollContainer: {marginTop: 'auto', backgroundColor: theme.COLOR_1},
    suggestButton: {
        alignSelf: 'center',
        marginTop: 0.2 * height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: theme.BORDER_RADIUS_2,
        opacity: theme.OPACITY_3,
    },
    suggestButtonText: {
        textAlign: 'center',
        fontWeight: theme.FONT_WEIGHT_2,
        width: 0.4 * width,
    },
});
