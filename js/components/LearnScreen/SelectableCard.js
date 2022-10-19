import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import theme from 'platonia_client/styles/theme';

class SelectableCard extends Component {
    /*
    selected - is the card currently selected or not
    */
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        };
    }

    /*
    If the card is selected or deselected, trigger the corresponding function in the parent Component
    */
    componentDidUpdate(prevProps, prevState) {
        if (prevState.selected !== this.state.selected) {
            this.state.selected ? this.props.onSelect() : this.props.onDelete();
        }
    }

    onPress = () => {
        this.setState((prevState, props) => ({selected: !prevState.selected}));
    };

    render() {
        return (
            <TouchableOpacity
                style={[
                    styles.container,
                    {
                        backgroundColor: this.state.selected
                            ? 'white'
                            : theme.COLOR_7,
                    },
                ]}
                onPress={this.onPress}>
                <Text style={{color: this.state.selected ? 'black' : 'white'}}>
                    {this.props.children}
                </Text>

                {this.state.selected && (
                    <Icon name="check" size={17} style={{color: 'black'}} />
                )}
            </TouchableOpacity>
        );
    }
}

SelectableCard.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.BORDER_RADIUS_1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
});

export default SelectableCard;
