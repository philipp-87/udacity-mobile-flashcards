import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from "react-native";
import { gray, purple, orange, white } from "../utils/colors";

class NewQuestionView extends Component {
    state = {
        questionText: null,
        answerText: null
    };

    render() {
        let item = {
            key: "DeckNew",
            title: "Deck New",
            question: "QuestionNew",
            answer: "AnswerNew"
        };

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
                    onPress={() =>
                        this.props.navigation.navigate("DeckView", {
                            deck: item
                        })}
                >
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

export default NewQuestionView;
