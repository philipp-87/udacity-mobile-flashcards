import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { gray, white, red, green } from "../utils/colors";
import { connect } from "react-redux";
import { setScore } from "../actions";
import { addScore } from "../utils/api";
import { NavigationActions } from "react-navigation";

class QuizView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Quiz"
        };
    };

    state = {
        showAnswer: false,
        numberOfQuestions: 0,
        currentQuestion: 0,
        score: 0
    };

    componentDidMount() {
        let deck = this.props.navigation.state.params.deck;
        let questions = deck.questions;

        this.setState({
            numberOfQuestions: questions.length
        });
    }

    getQuestion() {
        let deck = this.props.navigation.state.params.deck;
        let questions = deck.questions;
        let question = questions[this.state.currentQuestion];

        return question;
    }

    onAnswer(answer) {
        const { setScore } = this.props;
        let deck = this.props.navigation.state.params.deck;

        if (answer === "correct") {
            this.setState({
                score: this.state.score + 1
            });
        }
        if (this.state.currentQuestion === this.state.numberOfQuestions - 1) {
            setTimeout(() => {
                //save to redux
                setScore(this.state.score, deck);

                //save to asyncstorage
                addScore(deck.title, this.state.score);

                //Go to homescreen and reset stack
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "Home" })]
                });
                this.props.navigation.dispatch(resetAction);
            }, 500);
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
                    {this.state.currentQuestion + 1}/{this.state.numberOfQuestions}
                </Text>
                <Text style={{ fontSize: 15 }}>
                    {this.state.score / this.state.numberOfQuestions * 100} %
                </Text>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.correctButton}
                        onPress={() => this.onAnswer("correct")}
                    >
                        <Text style={{ color: white }}>CORRECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.incorrectButton}
                        onPress={() => this.onAnswer("incorrect")}
                    >
                        <Text style={{ color: white }}>INCORRECT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setScore: (score, deck) => dispatch(setScore(score, deck))
    };
}

function mapStateToProps(state) {
    return {};
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

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);
