import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { gray, white, red, green } from "../utils/colors";

class QuizView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Quiz"
        };
    };

    state = {
        showAnswer: false,
        numberOfQuestions: 0,
        currentQuestion: 0
    };

    componentDidMount() {
        let deck = this.props.navigation.state.params.deck;
        let questions = deck.questions;

        this.setState({
            numberOfQuestions: questions.length - 1
        });
    }

    getQuestion() {
        let deck = this.props.navigation.state.params.deck;
        let questions = deck.questions;
        let question = questions[this.state.currentQuestion];

        return question;
    }

    onAnswer() {
        if (this.state.currentQuestion == this.state.numberOfQuestions) {
            alert("End reached");
            return;
        }
        this.setState({
            currentQuestion: this.state.currentQuestion + 1,
            showAnswer: false
        });
        return;
    }

    render() {
        let deck = this.props.navigation.state.params.deck;
        console.log(this.state.numberOfQuestions);
        console.log(this.state.currentQuestion);

        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>
                    {this.state.showAnswer ? (
                        this.getQuestion().answer
                    ) : (
                        this.getQuestion().question
                    )}
                </Text>
                <TouchableOpacity
                    style={styles.answerButton}
                    onPress={() =>
                        this.setState({
                            showAnswer: !this.state.showAnswer
                        })}
                >
                    <Text style={{ color: red }}>
                        {this.state.showAnswer ? "Question" : "Answer"}
                    </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 15 }}>
                    {this.state.currentQuestion + 1}/{this.state.numberOfQuestions + 1}
                </Text>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.correctButton}
                        onPress={() => this.onAnswer()}
                    >
                        <Text style={{ color: white }}>CORRECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.incorrectButton}
                        onPress={() => this.onAnswer()}
                    >
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
