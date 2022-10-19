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
// Local Imports
import NavBtn from '../../Global/NavigationBtn';
import {
    goToPrevScreen,
    goToEditScreen,
    goToAddSuperpowersFromProfile,
} from '../../../navigation/gotoactions';
import ActionButton from 'react-native-action-button';
import theme from '../../../../../styles/theme';

import {getSuperpowers} from '../../../../redux/actions/superpowers';

class EditSuperpowers extends Component {
    componentDidMount = () => {
        this.props.dispatch(
            getSuperpowers({
                onSuccess: () => {},
                onFailure: () => {},
            }),
        );
    };

    render() {
        let superPowerList = this.props.superpowers.map(superpower => (
            <TouchableOpacity
                key={superpower.id}
                style={styles.titleCard}
                onPress={() =>
                    goToEditScreen(this.props.componentId, superpower)
                }>
                <View style={styles.titleCardTextContainer}>
                    <Text style={styles.titleCardText} numberOfLines={1}>
                        {superpower.description}
                    </Text>
                </View>
                <Icon name="pen" style={{color: 'white'}} />
            </TouchableOpacity>
        ));

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.headingContainer}>
                    <NavBtn
                        containerStyle={styles.backBtn}
                        text="Back"
                        textStyle={{marginLeft: 5}}
                        onPress={() => goToPrevScreen(this.props.componentId)}
                    />
                    <Text style={styles.heading1}>My Superpowers</Text>
                </SafeAreaView>

                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}>
                    {superPowerList}
                </ScrollView>

                <ActionButton
                    buttonColor="white"
                    renderIcon={() => <Icon name="plus" size={15} />}>
                    <ActionButton.Item
                        size={40}
                        title="Add More Superpowers"
                        onPress={() =>
                            goToAddSuperpowersFromProfile(
                                this.props.componentId,
                            )
                        }>
                        <Icon name="bolt" />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        superpowers: state.superpowers,
    };
}

export default connect(mapStateToProps)(EditSuperpowers);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLOR_1,
    },
    headingContainer: {
        backgroundColor: theme.COLOR_7,
        alignItems: 'center',
    },
    backBtn: {
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    scrollContainer: {
        paddingTop: 30,
    },
    heading1: {
        fontSize: theme.FONT_SIZE_2,
        marginBottom: 20,
        color: 'white',
        fontWeight: theme.FONT_WEIGHT_2,
    },
    titleCard: {
        backgroundColor: theme.COLOR_7,
        marginVertical: 5,
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleCardTextContainer: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginRight: 20,
        marginLeft: 15,
    },
    titleCardText: {
        fontSize: theme.FONT_SIZE_2,
        fontWeight: theme.FONT_WEIGHT_1,
        color: 'white',
    },
});
