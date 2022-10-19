import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// Local Imports
import BigRedButton from 'js/components/Global/BigRedButton';
import Tag from 'js/components/Global/Tag';
import SelectableCard from './SelectableCard';
import {goToPrevScreen, goToMainScreen} from 'js/navigation/goToActions';
import {
    fetchSkillSuggestions,
    fetchSkillsFollowed,
} from '../../redux/actions/skills';
import {followSkills} from 'js/redux/actions/skills';
import skillsData from 'platonia_client/dummyAPI/skillsData';
import NavBtn from 'js/components/Global/NavigationBtn';
import SpecialTagInput from 'js/components/Global/SpecialTagInput';
import theme from 'platonia_client/styles/theme';

class LearnScreen extends Component {
    /*
    skillsToRender - the list of suggestions to display to the user.
    tagSkills - Skills that the user types into the textinput
    selectableSkills - Skills that the user selects from the list of suggestions
    displaySaveBtn - should the save button be displayed or not. It is displayed only if the user 
                    types or selects something i.e. a change is made.

    */
    constructor(props) {
        super(props);
        this.state = {
            skillsToRender: [],
            tagSkills: [],
            selectableSkills: [],
            displaySaveBtn: false,
        };
    }

    componentDidMount = () => {
        this.props.dispatch(
            fetchSkillSuggestions({
                onSuccess: res => {
                    let data = res?.data?.length ? res?.data : skillsData;
                    let skills = [];

                    for (let i = 0; i < data.length; i++) {
                        let skill = data[i];
                        skills.push(skill.skillName);
                    }

                    this.setState({skillsToRender: skills});
                },
                onFailure: () => {},
            }),
        );

        this.props.dispatch(
            fetchSkillsFollowed({
                onSuccess: () => {},
                onFailure: () => {},
            }),
        );
    };

    isSkillsUpdated = () => {
        /*
        Check if either tagSkills or selectableSkills has new skills added by the user
        */
        if (
            this.state.tagSkills.length === 0 &&
            this.state.selectableSkills.length === 0
        ) {
            return false;
        } else {
            return true;
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.isSkillsUpdated() && !prevState.displaySaveBtn) {
            this.setState({displaySaveBtn: true});
        } else if (!this.isSkillsUpdated() && prevState.displaySaveBtn) {
            this.setState({displaySaveBtn: false});
        }
    }

    handleTags = newTags => {
        this.setState({tagSkills: newTags});
    };

    onSkillSelect = skill => {
        /*
        If the new skill to be added does not already exist in the user's skills
        */
        this.setState((prevState, props) => {
            if (
                prevState.selectableSkills.indexOf(skill) === -1 &&
                prevState.tagSkills.indexOf(skill) === -1 &&
                props.followedSkills.indexOf(skill) === -1
            ) {
                return {
                    selectableSkills: [...prevState.selectableSkills, skill],
                };
            }
        });
    };

    onSkillDelete = skill => {
        this.setState((prevState, props) => {
            /*
            Check if the skill to be deleted exists in the list of selectable skills
            Why? Because we could have ignored adding it because it already exists in tagSkills
            */
            if (prevState.selectableSkills.indexOf(skill) !== -1) {
                let tempArr = [...prevState.selectableSkills];
                tempArr.splice(tempArr.indexOf(skill), 1);
                return {
                    selectableSkills: tempArr,
                };
            }
        });
    };

    goToNextScreen = () => {
        /* 
        - If in Onboarding, user cannot proceed till selecting atleast one skill
        - Based on whether, the user is from profile or in onboarding, go to the corresponding screen
        */
        if (this.isSkillsUpdated()) {
            const callbackFn = this.props.fromProfile
                ? () => goToPrevScreen(this.props.componentId)
                : () => goToMainScreen();
            this.props.dispatch(
                followSkills(
                    this.state.tagSkills.concat(this.state.selectableSkills),
                    {
                        onSuccess: callbackFn,
                    },
                ),
            );
        } else if (this.props.fromProfile) {
            goToPrevScreen(this.props.componentId);
        }
    };

    render() {
        let skillSuggestions = this.state.skillsToRender;
        const skills = skillSuggestions.map((val, index) => (
            <SelectableCard
                key={index}
                onSelect={() => {
                    this.onSkillSelect(val);
                }}
                onDelete={() => {
                    this.onSkillDelete(val);
                }}>
                {val}
            </SelectableCard>
        ));
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{flex: 1}}
                onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {this.props.fromProfile && (
                        <SafeAreaView>
                            <NavBtn
                                containerStyle={styles.backBtn}
                                text="Back"
                                textStyle={{marginLeft: 5}}
                                onPress={() =>
                                    goToPrevScreen(this.props.componentId)
                                }
                            />
                        </SafeAreaView>
                    )}

                    {!this.props.fromProfile && (
                        <SafeAreaView>
                            <Text style={styles.header}>
                                What would you like to learn?
                            </Text>
                        </SafeAreaView>
                    )}

                    {this.props.fromProfile && (
                        <>
                            <View style={styles.subHeader1}>
                                <Text style={styles.subHeaderText1}>
                                    Skills I am following
                                </Text>
                            </View>
                            <View style={styles.scrollContainer1}>
                                <ScrollView>
                                    <View style={styles.scrollSubContainer1}>
                                        {/* FIXME: Follow skills remove api hasn't been implemented in the backend yet */}
                                        {this.props.followedSkills.map(
                                            (val, index) => (
                                                <Tag
                                                    isTouchable
                                                    key={index}
                                                    onPress={() =>
                                                        console.log()
                                                    }
                                                    drawX>
                                                    {val}
                                                </Tag>
                                            ),
                                        )}
                                    </View>
                                </ScrollView>
                            </View>
                            <Text style={styles.subHeader2}>
                                Add more skills
                            </Text>
                        </>
                    )}

                    <View
                        style={[
                            styles.formContainer,
                            {
                                marginBottom:
                                    this.props.fromProfile &&
                                    this.state.displaySaveBtn
                                        ? 20
                                        : 80,
                            },
                        ]}>
                        <SpecialTagInput
                            textFieldName="Skills"
                            handleTags={this.handleTags}
                            maxLength={280}
                        />

                        <Text style={styles.formSubHeading}>Suggestions</Text>

                        <View style={styles.scrollContainer2}>
                            <ScrollView
                                keyboardDismissMode="on-drag"
                                indicatorStyle="white">
                                <View style={styles.scrollSubContainer2}>
                                    {skills}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    {!this.props.fromProfile && (
                        <BigRedButton
                            onPress={this.goToNextScreen}
                            active={this.state.displaySaveBtn}>
                            Next
                        </BigRedButton>
                    )}
                    {this.props.fromProfile && this.state.displaySaveBtn && (
                        <BigRedButton onPress={this.goToNextScreen}>
                            Save
                        </BigRedButton>
                    )}
                </View>
            </TouchableOpacity>
        );
    }
}

LearnScreen.propTypes = {
    fromProfile: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        followedSkills: state.skills?.skillsFollowed?.map(
            skill => skill?.skillId?.skillName || skill?.skillName,
        ),
    };
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLOR_1,
        flex: 1,
    },
    backBtn: {
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    header: {
        color: 'white',
        fontSize: theme.FONT_SIZE_4,
        fontWeight: theme.FONT_WEIGHT_3,
        marginTop: 20,
        width: 0.7 * width,
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: 50,
    },
    subHeader1: {
        width: 0.9 * width,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    subHeaderText1: {
        color: 'white',
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_3,
    },
    scrollContainer1: {
        width: 0.9 * width,
        alignSelf: 'center',
        backgroundColor: theme.COLOR_3,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: theme.BORDER_RADIUS_1,
        maxHeight: 0.13 * height,
    },
    scrollSubContainer1: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    subHeader2: {
        color: 'white',
        marginTop: 40,
        marginBottom: 20,
        width: 0.9 * width,
        alignSelf: 'center',
        fontSize: theme.FONT_SIZE_3,
        fontWeight: theme.FONT_WEIGHT_3,
    },
    formContainer: {
        width: 0.9 * width,
        flex: 1,
        alignSelf: 'center',
    },
    formSubHeading: {
        color: 'white',
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_3,
        marginTop: 20,
        marginBottom: 15,
    },
    scrollContainer2: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: theme.COLOR_3,
        borderRadius: theme.BORDER_RADIUS_1,
    },
    scrollSubContainer2: {
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
});

export default connect(mapStateToProps)(LearnScreen);
