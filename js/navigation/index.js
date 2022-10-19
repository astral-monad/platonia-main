import {Navigation} from 'react-native-navigation';

export const goToScreen = (screenName, {passProps = {}, options = {}} = {}) => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: screenName,
                            passProps,
                            options,
                        },
                    },
                ],
            },
        },
    });
};

export const goToMainScreen = () => {
    Navigation.setRoot({
        root: {
            bottomTabs: {
                children: [
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        // id: 'DISCOVER.DISCOVER',
                                        name: 'Discover',
                                        passProps: {},
                                        options: {},
                                    },
                                },
                            ],
                            options: {
                                bottomTab: {
                                  icon: require('../assets/icons/discover.png')
                                }
                            }
                        },
                    },
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        // id: 'CONVERSATIONS.CONVERSATIONS',
                                        name: 'Conversations',
                                        passProps: {},
                                        options: {},
                                    },
                                },
                            ],
                            options: {
                                bottomTab: {
                                  icon: require('../assets/icons/conversations.png')
                                }
                            }
                        },
                    },
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        // id: 'PROFILE.PROFILE',
                                        name: 'Profile',
                                        passProps: {},
                                        options: {},
                                    },
                                },
                            ],
                            options: {
                                bottomTab: {
                                  icon: require('../assets/icons/profile.png')
                                }
                            }
                        },
                    },
                ],
                options: {
                    bottomTabs: {
                        backgroundColor: '#181818',
                        barStyle: 'black',
                        animate: true,
                        tabsAttachMode: 'afterInitialTab',
                        // translucent: true,
                    },
                },
            },
        },
    });
};

export const pushScreen = (
    componentId,
    screenName,
    {passProps = {}, options = {}} = {},
    id = '',
) => {
    Navigation.push(componentId, {
        component: {
            id: id,
            name: screenName,
            passProps,
            options,
        },
    });
};

export const goBack = (componentId, options = {}) => {
    Navigation.pop(componentId, options);
};

export const goBackTo = (componentId, options = {}) => {
    Navigation.popTo(componentId, options);
};

export const goBackToRoot = (componentId, options = {}) => {
    Navigation.popToRoot(componentId, options);
};

export const showOverlay = (
    screenName,
    {passProps = {}, options = {}} = {},
) => {
    Navigation.showOverlay({
        component: {
            name: screenName,
            passProps,
            options,
        },
    });
};
