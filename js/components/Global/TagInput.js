import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
// Local Imports
import theme from 'platonia_client/styles/theme';
import Tag from 'js/components/Global/Tag';

/* 
Note: For some reason if the enclosing View of this component 
(wherever you're using it) uses a margin with percentage, 
the tags get squished. If you used margin with absolute values it's fine.
*/

/* 
Note: This component is only the TextInput part. 
The one with suggestions used in the SuggestSuperPowerScreen 
is different. -> (SkillCard.js)
*/

/*
Important detail about the JSX/Layout in this component: The display of tags along with 
textinput is achieved by displaying the tags as a set of boxes followed by a separate textinput.
This is why there is a tags state variable separate from the text state variable. The tags
state variable controls the list of boxes displayed. The text state variable controls the 
text in the textinput.
*/

export default class TagInput extends Component {
    constructor(props) {
        super(props);

        // The following variable is needed to change the char_counter accordingly.
        // For a description of char_counter look at the handleText function

        // var initialTags = this.props.initialTags.map(s => s.skillName);
        var initialTags = this.props.initialTags;

        const initialTagsLength = initialTags.reduce(
            (total, val) => total + val.length,
            0,
        );

        this.state = {
            text: '',
            tags: initialTags,
            placeholder: initialTags.length === 0 ? this.props.placeholder : '',
            char_counter: this.props.maxLength - initialTagsLength,
        };
    }

    isArrEqual = (a, b) => {
        if (a.length != b.length) return false;
        else {
            for (let i = 0; i < a.length; i++) if (a[i] != b[i]) return false;
            return true;
        }
    };

    handlePlaceholderText = taglength => {
        if (taglength !== 0) {
            this.setState({placeholder: ''});
        } else {
            this.setState({placeholder: this.props.placeholder});
        }
    };

    isTextValidTag = text => {
        /* 
        Check if this tag already exists in the tags state variable 
        and check if the tag is not an empty string
        */
        if (this.state.tags.indexOf(text) === -1 && text.length !== 0)
            return true;
        else false;
    };

    componentDidUpdate(prevProps, prevState) {
        /* 
        Check if either the text or tags state variables have changed and
        accordingly change the placeholder state variable and propagate
        changes in the tags state variable to the parent

        The handleTags function received through props is used to mirror the 
        tags state variable in the parent by sending notifications to the parent 
        whenever the tags state variable changes here. This is in case the parent 
        needs to know what the tags are. Example: Parent communicates with redux.
        */
        if (
            prevState.text !== this.state.text ||
            !this.isArrEqual(prevState.tags, this.state.tags)
        ) {
            this.handlePlaceholderText(this.state.tags.length);
            if (this.isTextValidTag(this.state.text)) {
                this.props.handleTags(this.state.tags.concat(this.state.text));
            } else {
                this.props.handleTags(this.state.tags);
            }
        }
    }

    handleText = text => {
        /* 
        Check if the last character in the textInput is a comma. If it is,
        check if it is a valid tag and then remove it from the textinput field 
        add it to the list of tags and also update the char_counter accordingly. 
        The char_counter is used to maintain the maxLength allowed in the textinput.
        Otherwise just change the text state variable.
        */
        if (text.slice(-1) == ',') {
            let tag = text.substring(0, text.length - 1);
            if (this.state.tags.indexOf(tag) === -1 && tag.length !== 0) {
                this.setState({
                    text: '',
                    tags: this.state.tags.concat(tag),
                    placeholder: '',
                    char_counter: this.state.char_counter - text.length,
                });
            } else {
                this.setState({text});
            }
        } else {
            this.setState({text});
        }
    };

    selectedTagPress = superpower => {
        /* 
            This function is triggered if the user deletes an already selected tag
        */
        this.setState((prevState, props) => {
            const indexToRemove = prevState.tags.indexOf(superpower);
            let tags = [...prevState.tags];
            let removedTag = tags.splice(indexToRemove, 1);
            return {
                tags,
                char_counter: prevState.char_counter + removedTag.length,
            };
        });
    };

    emptyBackspace = ({nativeEvent}) => {
        /*
            This function is triggered if the textinput has nothing and the user 
            presses backspace. The programmed behaviour is to pop a tag and set it as
            the text in the textinput and delete that tag in the tags state variable
        */
        if (
            nativeEvent.key === 'Backspace' &&
            this.state.text?.length === 0 &&
            this.state.tags.length !== 0
        ) {
            this.setState((prevState, props) => {
                let tags = [...prevState.tags];
                let currentTag = tags.pop();
                return {
                    text: currentTag,
                    tags,
                    char_counter: prevState.char_counter + currentTag.length,
                };
            });
        }
    };

    render() {
        let selectedTags = this.state.tags.map((superpower, index) => (
            <Tag
                key={index}
                isTouchable={this.props.editable}
                drawX
                onPress={() => this.selectedTagPress(superpower)}>
                {superpower}
            </Tag>
        ));

        return (
            <View style={[styles.inputContainer, this.props.style]}>
                {selectedTags}
                <TextInput
                    onChangeText={this.handleText}
                    placeholder={this.state.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor}
                    style={styles.inputField}
                    value={this.state.text}
                    onKeyPress={this.emptyBackspace}
                    editable={this.props.editable}
                    keyboardAppearance={this.props.keyboardAppearance}
                    keyboardType={this.props.keyboardType}
                    maxLength={this.state.char_counter}
                />
            </View>
        );
    }
}

TagInput.defaultProps = {
    editable: true,
    placeholder: '',
    placeholderTextColor: theme.COLOR_4,
    keyboardAppearance: 'dark',
    keyboardType: 'default',
    initialTags: [],
};

TagInput.propTypes = {
    handleTags: PropTypes.func.isRequired,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    maxLength: PropTypes.number.isRequired,
    initialTags: PropTypes.array,
    editable: PropTypes.bool,
    keyboardAppearance: PropTypes.string,
    keyboardType: PropTypes.string,
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    inputField: {
        color: 'white',
        flex: 1,
    },
});
