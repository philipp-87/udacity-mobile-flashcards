import React, { Component } from "react"
import { StyleSheet, Text, View } from "react-native"

class NewDeckView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>NewDeckView</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default NewDeckView
