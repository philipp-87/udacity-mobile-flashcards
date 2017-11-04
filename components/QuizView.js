import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { gray, white, red, green, orange, purple } from "../utils/colors";
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
        score: 0,
        isEndReached: false
    };

    componentDidMount() {
        let deck = this.props.navigation.state.params.deck;
        let questions = deck.questions;

        this.setState({
            numberOfQuestions: questions.length
        });
    }

    restartQuiz() {
        let deck = this.props.navigation.state.params.deck;
        let questions = deck.questions;

        this.setState({
            numberOfQuestions: questions.length,
            currentQuestion: 0,
            score: 0,
            isEndReached: false
        });
    }

    getQuestion() {
        let deck = this.props.navigation.state.params.deck;
        let questions = deck.questions;
        let question = questions[this.state.currentQuestion];

        return question;
    }

    backToDecks() {
        //Go to homescreen and reset stack
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Home" })]
        });
        this.props.navigation.dispatch(resetAction);
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
            this.setState({
                isEndReached: true
            });
            setTimeout(() => {
                //save to redux
                setScore(this.state.score, deck);

                //save to asyncstorage
                addScore(deck.title, this.state.score);
            }, 500);
            return;
        }
        this.setState({
            currentQuestion: this.state.currentQuestion + 1,
            showAnswer: false
        });
        return;
    }

    renderScoreCard() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer} />
                <View style={styles.questionAndAnswerContainer}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 30,
                                fontWeight: "bold",
                                marginBottom: 30
                            }}
                        >
                            Finished!
                        </Text>
                        <View
                            style={[
                                styles.scoreWrapper,
                                { height: 150, borderRadius: 150 }
                            ]}
                        >
                            <Text style={styles.scoreText}>
                                Score:{" "}
                                {this.state.score /
                                    this.state.numberOfQuestions *
                                    100}{" "}
                                %
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: orange }]}
                        onPress={() => this.restartQuiz()}
                    >
                        <Text style={{ color: white }}>TRY AGAIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: purple }]}
                        onPress={() => this.backToDecks()}
                    >
                        <Text style={{ color: white }}>BACK TO DECKS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        let deck = this.props.navigation.state.params.deck;

        if (!this.state.isEndReached) {
            return (
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <View style={styles.scoreWrapper}>
                            <Text style={styles.scoreText}>
                                Score:{" "}
                                {this.state.score /
                                    this.state.numberOfQuestions *
                                    100}{" "}
                                %
                            </Text>
                        </View>
                    </View>
                    <View style={styles.questionAndAnswerContainer}>
                        <View
                            style={{
                                flex: 0.1,
                                width: 300,
                                alignItems: "flex-start",
                                marginTop: 5,
                                marginLeft: 10
                            }}
                        >
                            <Text style={styles.currentQuestionText}>
                                {this.state.currentQuestion + 1} /{" "}
                                {this.state.numberOfQuestions}
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text style={styles.questionText}>
                                {this.state.showAnswer ? (
                                    this.getQuestion().answer
                                ) : (
                                    this.getQuestion().question
                                )}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.answerButtonContainer}
                            onPress={() =>
                                this.setState({
                                    showAnswer: !this.state.showAnswer
                                })}
                        >
                            <Text style={{ color: red }}>
                                {this.state.showAnswer ? "Question" : "Answer"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.onAnswer("correct")}
                        >
                            <Text style={{ color: white }}>CORRECT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: red }]}
                            onPress={() => this.onAnswer("incorrect")}
                        >
                            <Text style={{ color: white }}>INCORRECT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return this.renderScoreCard();
        }
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
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerContainer: {
        flex: 0.2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 300
    },
    questionAndAnswerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: white,
        width: 300,
        borderColor: gray,
        borderWidth: 1,
        borderRadius: 5
    },
    answerButtonContainer: {
        flex: 0.2,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 300,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    button: {
        backgroundColor: green,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    questionText: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold"
    },
    currentQuestionText: {
        fontSize: 15,
        flex: 1,
        fontWeight: "bold"
    },
    scoreText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    buttonWrapper: {
        marginTop: 40
    },
    scoreWrapper: {
        height: 50,
        width: 150,
        flexDirection: "column",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        backgroundColor: orange,
        borderRadius: 50
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);
