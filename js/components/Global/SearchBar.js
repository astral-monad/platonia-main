import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// Local Imports
import theme from '../../../styles/theme';

import {showOverlay} from '../../navigation';

const SearchBar = props => {
    const handleSearchView = () => {
        showOverlay('SearchOverlay', {
            passProps: {...props},
        });
    };

    return (
        <TouchableWithoutFeedback onPress={handleSearchView}>
            <View style={[styles.container, props.containerStyle]}>
                <Icon
                    name="search"
                    style={{
                        color: props.placeholderColor || theme.COLOR_4,
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

SearchBar.defaultProps = {
    placeholder: '',
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLOR_3,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
});

export default SearchBar;
