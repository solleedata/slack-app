import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
// import iconSearch from '../images/icon-search.png';
// import iconThreeDots from '../images/icon-3-dots.png';

export default function ChannelHeader({ navigation, channel, client }) {
    let channelTitle = '#channel_name'

    if (channel && channel.ddata && channel.data.name) {
        channelTitle = '# ' + channel.data.name.toLowerCase().replace(' ', '_')
    }

    const memberIds = channel && channel.state ? Object.keys(channel.state.members) : []

    // Check if it's oneOnOneConversation
    if (channel && memberIds.length === 2) {
        // if yes, use name of other user as channel title
        const otherUserId = memberIds[0] === client.user.id ? memberIds[1] : memberIds[0]

        channelTitle = channel.state.members[otherUserId].user.name
    }
    return (
        <View style={styles.container}>
            <View style={styles.leftContent}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.openDrawer()
                    }}
                >
                    <Text style={styles.hamburgerIcon}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.channelTitle}>{channelTitle}</Text>
            </View>
            <View style={styles.rightContent}>
                <TouchableOpacity style={styles.searchIconContainer}>
                    <Image source={iconSearch} style={styles.searchIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuIconContainer}>
                    <Image source={iconThreeDots} style={styles.menuIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
    },
    leftContent: {
        flexDirection: 'row',
    },
    hamburgerIcon: {
        fontSize: 27,
    },
    channelTitle: {
        color: 'black',
        marginLeft: 10,
        fontWeight: '900',
        fontSize: 17,
        fontFamily: 'Lato-Regular',
    },
    rightContent: {
        flexDirection: 'row',
        marginRight: 10,
    },
    searchIconContainer: { marginRight: 15, alignSelf: 'center' },
    searchIcon: {
        height: 18,
        width: 18,
    },
    menuIcon: {
        height: 18,
        width: 18,
    },
    menuIconContainer: { alignSelf: 'center' },
});