import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { gray, purple, orange, white } from "../utils/colors";

class QuizView extends Component {
    render() {
        let deck = this.props.navigation.state.params.deck;

        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>{deck.question}</Text>
                <TouchableOpacity style={styles.answerButton}>
                    <Text style={{ color: white }}>SUBMIT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.correctButton}>
                    <Text style={{ color: white }}>SUBMIT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.incorrectButton}>
                    <Text style={{ color: white }}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    answerButton: {
        backgroundColor: gray,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    correctButton: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    incorrectButton: {
        backgroundColor: orange,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    }
});

export default QuizView;
