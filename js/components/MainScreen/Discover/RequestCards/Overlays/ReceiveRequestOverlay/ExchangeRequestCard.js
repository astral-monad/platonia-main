import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from 'platonia_client/styles/theme';
// Local Imports

const ExchangeRequestCard = props => {
    const [selected, setSelected] = useState(false);

    const handlePress = () => {
        const onSelectExchange = props.onSelect;
        onSelectExchange(props.superpower.id, !selected);
        setSelected(!selected);
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[
                styles.container,
                {
                    borderWidth: selected ? 0 : 1,
                    backgroundColor: selected ? 'white' : theme.COLOR_1,
                },
            ]}>
            <Text style={[styles.text, {color: selected ? 'black' : 'white'}]}>
                "{props.superpower.description}"
            </Text>
            {selected && <Icon name="check" size={15} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: theme.BORDER_RADIUS_1,
        borderColor: 'white',
    },
    text: {
        width: '80%',
        fontStyle: 'italic',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default ExchangeRequestCard;
