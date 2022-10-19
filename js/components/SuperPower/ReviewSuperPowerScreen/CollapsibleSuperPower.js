import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';

// Local Imports
import {removeSuperpower} from 'js/redux/actions/superpowers';
import {showOverlay} from 'js/navigation';
import TagInput from 'js/components/Global/TagInput';
import theme from 'platonia_client/styles/theme';

class CollapsibleSuperPower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleCollapse: true, //The collapsible is collapsed or expanded based on this state variable
            title: this.props.title,
            tags: this.props.skills?.map(s => s.skillName),
            learnt: this.props.learntFrom,
        };
    }

    deleteSuperpowerRedux = () => {
        this.props.dispatch(removeSuperpower(this.props.id, {}));

        let removedSuperpower = this.props.updatedSuperpowers.filter(
            s => s.id === this.props.id,
        );

        if (removedSuperpower.length) {
            removedSuperpower[0].removed = true;
        }
    };

    updateSuperpower() {
        let superpower = this.props.updatedSuperpowers.filter(
            s => s.id === this.props.id,
        );

        let updatedSuperpower = {
            id: this.props.id,
            description: this.state.title,
            superpowerTags: this.state.tags,
            learntFrom: this.state.learntFrom || '',
        };

        if (!superpower.length) {
            this.props.updatedSuperpowers.push(updatedSuperpower);
            return;
        }

        superpower[0].description = updatedSuperpower.description;
        superpower[0].superpowerTags = updatedSuperpower.superpowerTags;
        superpower[0].learntFrom = updatedSuperpower.learntFrom;
    }

    handleTitle = text => {
        this.setState({title: text});
        this.updateSuperpower();
    };

    handleTags = tags => {
        this.setState({tags});
        this.updateSuperpower();
    };

    handleLearnt = text => {
        this.setState({learnt: text});
        this.updateSuperpower();
    };

    handleToggleCollapse = () => {
        this.setState((prevState, props) => {
            return {
                toggleCollapse: !prevState.toggleCollapse,
            };
        });
    };

    onDelete = () => {
        showOverlay('ReviewSuperpower.DeleteSuperpowerOverlay', {
            passProps: {
                onSuccess: this.deleteSuperpowerRedux,
                superpowerDescription: this.state.title,
            },
        });
    };

    render = () => {
        // This is used to animate the chevron up and down on expanding and collapsing the card
        const rotate180 = {
            from: {
                rotate: this.state.toggleCollapse ? '-180deg' : '0deg',
            },
            to: {
                rotate: this.state.toggleCollapse ? '0deg' : '-180deg',
            },
        };

        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={styles.titleCard}
                    onPress={this.handleToggleCollapse}>
                    <View style={styles.titleCardTextContainer}>
                        <Text style={styles.titleCardText} numberOfLines={1}>
                            {this.state.toggleCollapse
                                ? this.state.title
                                : 'Edit Superpower'}
                        </Text>
                    </View>

                    <Animatable.View duration={300} animation={rotate180}>
                        <Icon
                            name="chevron-down"
                            size={15}
                            style={{color: 'white'}}
                        />
                    </Animatable.View>
                </TouchableOpacity>

                <Collapsible
                    collapsed={this.state.toggleCollapse}
                    align="bottom"
                    style={styles.collapsibleCard}>
                    <View style={styles.inputFieldContainer}>
                        <Text style={styles.inputFieldText}>Description</Text>
                        <View style={styles.inputFieldTextInputContainer}>
                            <TextInput
                                onChangeText={this.handleTitle}
                                value={this.state.title}
                                style={styles.inputFieldTextInput}
                                multiline={true}
                                maxLength={280}
                                keyboardAppearance="dark"
                            />
                        </View>
                    </View>

                    <View style={styles.inputFieldContainer}>
                        <Text style={styles.inputFieldText}>Tags</Text>
                        <View style={styles.inputFieldTextInputContainer}>
                            <TagInput
                                handleTags={this.handleTags}
                                maxLength={280}
                                style={styles.inputFieldTextInput}
                                initialTags={this.state.tags}
                            />
                        </View>
                    </View>

                    <View style={styles.inputFieldContainer}>
                        <Text style={styles.inputFieldText}>Learnt From</Text>
                        <View style={styles.inputFieldTextInputContainer}>
                            <TextInput
                                onChangeText={this.handleLearnt}
                                placeholder="From whom did you learn this skill?"
                                placeholderTextColor={theme.COLOR_4}
                                style={styles.inputFieldTextInput}
                                value={this.state.learnt}
                                multiline={true}
                                maxLength={280}
                                keyboardAppearance="dark"
                            />
                        </View>
                    </View>

                    <Icon
                        name="trash"
                        size={15}
                        style={{
                            color: 'white',
                            alignSelf: 'flex-end',
                            marginTop: 10,
                        }}
                        onPress={this.onDelete}
                    />
                </Collapsible>
            </View>
        );
    };
}

export default connect()(CollapsibleSuperPower);

CollapsibleSuperPower.propTypes = {
    title: PropTypes.string.isRequired,
    skills: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    // triggerUpdate: PropTypes.bool.isRequired,
    // onUpdateCallback: PropTypes.func.isRequired,
    // deleteFn: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: 5,
    },
    titleCard: {
        backgroundColor: theme.COLOR_7,
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleCardTextContainer: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        marginRight: 20,
        marginLeft: 15,
    },
    titleCardText: {
        fontSize: theme.FONT_SIZE_2,
        // fontWeight: theme.FONT_WEIGHT_1,
        color: 'white',
    },
    collapsibleCard: {
        backgroundColor: theme.COLOR_3,
        padding: 10,
    },
    inputFieldContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputFieldText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_1,
        flex: 1,
        textAlign: 'right',
        marginRight: 10,
    },
    inputFieldTextInputContainer: {
        backgroundColor: theme.COLOR_1,
        width: '75%',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: theme.BORDER_RADIUS_1,
    },
    inputFieldTextInput: {
        fontSize: theme.FONT_SIZE_1,
        color: 'white',
        paddingTop: 0,
    },
});
