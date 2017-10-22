import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { gray, purple, orange, white } from "../utils/colors";

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;

        return {
            title: deck.title
        };
    };

    render() {
        let deck = this.props.navigation.state.params.deck;

        return (
            <View style={styles.container}>
                <View style={styles.cardWrapper}>
                    <Text style={{ fontSize: 40 }}>{deck.title}</Text>
                    <Text style={{ fontSize: 20 }}>23 cards</Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.addCardButton}>
                        <Text style={{ color: white }}>ADD CARD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.startQuizButton}>
                        <Text style={{ color: white }}>START QUIZ</Text>
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
    cardWrapper: {
        flex: 1,
        width: 300,
        margin: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderColor: gray,
        borderWidth: 1,
        borderRadius: 5
    },
    buttonWrapper: {
        flex: 0.5,
        width: 300,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    addCardButton: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45
    },
    startQuizButton: {
        backgroundColor: orange,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginTop: 20
    }
});

export default DeckView;
