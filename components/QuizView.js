import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { gray, white, red, green } from "../utils/colors";

class QuizView extends Component {
    state = {
        showAnswer: false
    };

    render() {
        let deck = this.props.navigation.state.params.deck;

        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>
                    {this.state.showAnswer ? deck.answer : deck.question}
                </Text>
                <TouchableOpacity
                    style={styles.answerButton}
                    onPress={() =>
                        this.setState({
                            showAnswer: !this.state.showAnswer
                        })}
                >
                    <Text style={{ color: red }}>Answer</Text>
                </TouchableOpacity>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.correctButton}>
                        <Text style={{ color: white }}>CORRECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.incorrectButton}>
                        <Text style={{ color: white }}>INCORRECT</Text>
                    </TouchableOpacity>
                </View>
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
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    correctButton: {
        backgroundColor: green,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    incorrectButton: {
        backgroundColor: red,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    buttonWrapper: {
        marginTop: 40
    }
});

export default QuizView;
