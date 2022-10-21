import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// Local Imports
import SkillCategory from './SkillCategory.js';
import {
    goBackToRoot,
    goToLearnScreen,
    goToReviewSuperpowerScreen,
} from '../../../navigation/gotoactions';
import {fetchSuperpowerSuggestions} from '../../../client/superpower';
import superpowersData from '../../../../dummyAPI/superpowersData';
import NavBtn from '../../Global/NavigationBtn';
import BigRedButton from '../../Global/BigRedButton';
import theme from '../../../../styles/theme';

/*
State Variable:
- isTagDataEmpty: The screen is composed of SkillCategory components which control individual TagInputs.
This variable changes to true as soon as one of the SkillCategory components has a selected tag.
This variable is used to set whether the Save/Next Button is active or not and based on that which
screen to go to.
- suggestionsData: on mounting the component, data is fetched from the backend and stored here.
*/
const SuggestSuperPowerScreen = props => {
    const [isTagDataEmpty, setIsTagDataEmpty] = useState(true);
    const [suggestionsData, setSuggestionsData] = useState([]);

    useEffect(() => {
        //Use redux dispatch here
        fetchSuperpowerSuggestions().then(res => {
            let data = res?.data?.length ? res?.data : superpowersData;
            let suggestions = [];
            for (let i = 0; i < data.length; i++) {
                let obj = {};
                let category = data[i];
                let skills = category.skills || [];
                obj.skill_category = category.categoryName;
                obj.superpowers = [];

                for (let j = 0; j < skills.length; j++) {
                    let skill = skills[j];
                    obj.superpowers.push(skill.skillName);
                }

                suggestions.push(obj);
            }
            setSuggestionsData({suggestions});
        });
    }, []);

    const goToNextScreen = () => {
        if (props.fromProfile) {
            goBackToRoot(props.componentId);
        } else if (isTagDataEmpty && props.superpowers.length) {
            goToLearnScreen();
        } else {
            goToReviewSuperpowerScreen(props.componentId, {fromSuggest: true});
        }
    };

    // FIXME: Assign ID (from backend) here instead of index
    let arr = suggestionsData.suggestions?.map(
        ({skill_category, superpowers}, index) => (
            <SkillCategory
                key={index}
                title={skill_category}
                suggestedSuperpowers={superpowers}
                setIsTagsEmpty={setIsTagDataEmpty}
            />
        ),
    );

    return (
        <>
            <SafeAreaView style={styles.headingContainer}>
                {props.fromProfile && (
                    <NavBtn
                        containerStyle={styles.backBtn}
                        text="Profile"
                        textStyle={{marginLeft: 5}}
                        onPress={() => goBackToRoot(props.componentId)}
                    />
                )}
                <Text style={styles.headingText}>
                    {props.fromProfile
                        ? 'Add Superpowers'
                        : 'Add more Superpowers'}
                </Text>
            </SafeAreaView>

            <ScrollView style={styles.scrollContainer}>{arr}</ScrollView>

            {!props.fromProfile && (
                <BigRedButton
                    containerStyle={{
                        backgroundColor: isTagDataEmpty
                            ? theme.COLOR_6
                            : theme.COLOR_2,
                    }}
                    onPress={goToNextScreen}>
                    {isTagDataEmpty ? 'Skip' : 'Next'}
                </BigRedButton>
            )}
        </>
    );
};

SuggestSuperPowerScreen.propTypes = {
    fromProfile: PropTypes.bool,
};

const styles = StyleSheet.create({
    headingContainer: {
        backgroundColor: theme.COLOR_7,
    },
    backBtn: {
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    headingText: {
        color: 'white',
        alignSelf: 'center',
        marginBottom: 20,
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_2,
    },
    scrollContainer: {
        backgroundColor: theme.COLOR_1,
    },
});

function mapStateToProps(state) {
    return {
        superpowers: state.superpowers,
    };
}

export default connect(mapStateToProps)(SuggestSuperPowerScreen);
