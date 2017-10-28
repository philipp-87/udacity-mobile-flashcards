import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from "react-native";
import { gray, purple, orange, white } from "../utils/colors";
import { connect } from "react-redux";
import { addCard } from "../actions";

class NewQuestionView extends Component {
    state = {
        questionText: null,
        answerText: null
    };

    submit() {
        let deck = this.props.navigation.state.params.deck;
        const { addCard } = this.props;
        addCard(
            {
                question: this.state.questionText,
                answer: this.state.answerText
            },
            deck.id
        );
        this.props.navigation.goBack();
    }

    render() {
        let deck = this.props.navigation.state.params.deck;

        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>
                    Enter a question and answer for the new card
                </Text>
                <TextInput
                    style={{
                        width: 200,
                        height: 40,
                        borderColor: "gray",
                        borderWidth: 1,
                        padding: 5,
                        marginTop: 20
                    }}
                    onChangeText={questionText =>
                        this.setState({ questionText })}
                    value={this.state.questionText}
                    placeholder={"e.g. Do you like react native"}
                />
                <TextInput
                    style={{
                        width: 200,
                        height: 40,
                        borderColor: "gray",
                        borderWidth: 1,
                        padding: 5,
                        marginTop: 20
                    }}
                    onChangeText={answerText => this.setState({ answerText })}
                    value={this.state.answerText}
                    placeholder={"e.g. OMG, i love it!"}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => this.submit()}
                >
                    <Text style={{ color: white }}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCard: (card, deckId) => dispatch(addCard(card, deckId))
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
    submitButton: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionView);
