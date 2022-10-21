import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// Local imports
import {showOverlay} from '../../../navigation/index';
import {removeSuperpower} from '../../../redux/actions/superpowers';
import Tag from '../../Global/Tag';
import theme from '../../../../styles/theme';

const default_placeholder = 'Type or select a superpower';

/*
This is more or less a replica of js/components/Global/TagInput. This component is
separate because it requires some features which TagInput cannot provide
*/

/*
The SkillCategory component displays an overlay on selecting a tag,
and on success sends the superpower to redux and stores the tagname and
id here in the tags array. The id is stored in case the user wishes to remove
the particular tag.
*/
class SkillCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            tags: [], //Array of objects - object structure = {id, tag}
            placeholder: 'Type or select a superpower',
        };
    }

    handlePlaceholderText = taglength => {
        if (taglength !== 0) {
            this.setState({placeholder: ''});
        } else {
            this.setState({placeholder: default_placeholder});
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.tags.length !== prevState.tags.length) {
            this.handlePlaceholderText(this.state.tags.length);
            this.props.setIsTagsEmpty(this.state.tags.length === 0);
        }
    }

    isTextValidTag = text => {
        let idList = this.state.tags.map(obj => obj.tagName);
        if (idList.indexOf(text) === -1 && text.length !== 0) return true;
        else false;
    };

    showOverlay = (tagName, onSuccess) => {
        showOverlay('SuggestSuperPower.SuperpowerOverlay', {
            passProps: {
                tagName,
                onSuccess,
            },
        });
    };

    handleText = text => {
        if (text.slice(-1) == ',') {
            let tagName = text.substring(0, text.length - 1);
            if (this.isTextValidTag(tagName)) {
                this.showOverlay(tagName, superpowerObj => {
                    let id = superpowerObj.id;
                    this.setState((prevState, props) => ({
                        text: '',
                        tags: prevState.tags.concat({id, tagName}),
                        placeholder: '',
                    }));
                });
            } else {
                this.setState({text});
            }
        } else {
            this.setState({text});
        }
    };

    tagPress = tagName => {
        if (this.isTextValidTag(tagName))
            this.showOverlay(tagName, superpowerObj => {
                let id = superpowerObj.id; //This is executed by redux on data received from backend hence id
                this.setState((prevState, props) => ({
                    tags: prevState.tags.concat({id, tagName}),
                }));
            });
    };

    removeSuperpowerRedux = (id, callback) => {
        this.props.dispatch(removeSuperpower(id, {onSuccess: callback}));
    };

    selectedTagPress = superpower => {
        const id = superpower.id; // This is data currently stored by SkillCategory hence id not id.
        this.removeSuperpowerRedux(id, () => {
            this.setState((prevState, props) => {
                let idList = prevState.tags.map(obj => obj.id);
                let indexToRemove = idList.indexOf(id);
                newTags = [...prevState.tags];
                newTags.splice(indexToRemove, 1);
                return {
                    tags: newTags,
                };
            });
        });
    };

    // This function pops a tag if a user backspaces next to a tag
    emptyBackspace = ({nativeEvent}) => {
        if (
            nativeEvent.key === 'Backspace' &&
            this.state.text?.length === 0 &&
            this.state.tags?.length !== 0
        ) {
            let tags = [...this.state.tags];
            let currentTag = tags.pop();
            this.removeSuperpowerRedux(currentTag.id, () => {
                this.setState({text: currentTag.tagName, tags});
            });
        }
    };

    render() {
        // FIXME - assign proper ids here in suggestions
        let suggestions = this.props.suggestedSuperpowers.map((item, index) => (
            <Tag
                key={index}
                isTouchable
                drawPlus
                onPress={() => this.tagPress(item)}
                containerStyle={{marginHorizontal: 5}}>
                {item}
            </Tag>
        ));
        // FIXME - assign proper ids here in selectedTags
        let selectedTags = this.state.tags.map((tagObj, index) => (
            <Tag
                key={index}
                isTouchable
                drawX
                onPress={() => this.selectedTagPress(tagObj)}>
                {tagObj.tagName}
            </Tag>
        ));

        return (
            <View style={styles.container}>
                <Text style={styles.headingText}>{this.props.title}</Text>

                <View style={styles.inputContainer}>
                    {selectedTags}
                    <TextInput
                        onChangeText={this.handleText}
                        placeholder={this.state.placeholder}
                        placeholderTextColor={theme.COLOR_4}
                        style={styles.inputField}
                        value={this.state.text}
                        onKeyPress={this.emptyBackspace}
                        keyboardAppearance="dark"
                        // editable={false}
                    />
                </View>

                <ScrollView
                    horizontal={true}
                    contentContainerStyle={styles.tagScrollContainer}>
                    {suggestions}
                </ScrollView>
            </View>
        );
    }
}

SkillCategory.propTypes = {
    title: PropTypes.string.isRequired,
    suggestedSuperpowers: PropTypes.array.isRequired,
    setIsTagsEmpty: PropTypes.func.isRequired,
};

export default connect()(SkillCategory);

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        marginHorizontal: 20,
    },
    headingText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_3,
    },
    inputContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: theme.COLOR_7,
        marginTop: 20,
        padding: 10,
        borderRadius: theme.BORDER_RADIUS_1,
    },
    inputField: {
        color: 'white',
        flex: 1,
    },
    tagScrollContainer: {
        marginTop: 20,
    },
});
