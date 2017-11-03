import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { gray, purple, orange, white } from "../utils/colors";
import { connect } from "react-redux";
import _ from "lodash";

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;

        return {
            title: deck.title
        };
    };

    render() {
        let deck = this.props.navigation.state.params.deck;
        let newDeck;

        if (this.props.decks[deck.title].title === deck.title) {
            deck = this.props.decks[deck.title];
        }

        const deckSize = _.isEmpty(deck.questions)
            ? "0"
            : deck.questions.length;

        return (
            <View style={styles.container}>
                <View style={styles.cardWrapper}>
                    <Text style={{ fontSize: 40 }}>{deck.title}</Text>
                    <Text style={{ fontSize: 20 }}>{deckSize} cards</Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.addCardButton}
                        onPress={() =>
                            this.props.navigation.navigate("NewQuestionView", {
                                deck: deck
                            })}
                    >
                        <Text style={{ color: white }}>ADD CARD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        key={deckSize}
                        disabled={deckSize === "0" ? true : false}
                        style={[
                            styles.startQuizButton,
                            deckSize === "0" ? { opacity: 0.3 } : { opacity: 1 }
                        ]}
                        onPress={() =>
                            this.props.navigation.navigate("QuizView", {
                                deck: deck
                            })}
                    >
                        <Text style={{ color: white }}>START QUIZ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        decks: state
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    cardWrapper: {
        flex: 1,
        width: 300,
        margin: 20,
        backgroundColor: white,
        alignItems: "center",
        justifyContent: "center",
        borderColor: gray,
        borderWidth: 1,
        borderRadius: 5
    },
    buttonWrapper: {
        flex: 0.5,
        width: 300,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    addCardButton: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        alignItems: "center",
        justifyContent: "center"
    },
    startQuizButton: {
        backgroundColor: orange,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default connect(mapStateToProps)(DeckView);
