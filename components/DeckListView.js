import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList
} from "react-native";
import { gray } from "../utils/colors";

const data = [
    {
        key: "Deck1",
        title: "Deck 1",
        question: "What is placeholder Question1",
        answer: "Answer1"
    },
    {
        key: "Deck2",
        title: "Deck 2",
        question: "What is placeholder Question2",
        answer: "Answer2"
    },
    {
        key: "Deck3",
        title: "Deck 3",
        question: "What is placeholder Question3",
        answer: "Answer3"
    },
    {
        key: "Deck4",
        title: "Deck 4",
        question: "What is placeholder Question4",
        answer: "Answer4"
    },
    {
        key: "Deck5",
        title: "Deck 5",
        question: "What is placeholder Question5",
        answer: "Answer5"
    },
    {
        key: "Deck6",
        title: "Deck 6",
        question: "What is placeholder Question6",
        answer: "Answer6"
    },
    {
        key: "Deck7",
        title: "Deck 7",
        question: "What is placeholder Question7",
        answer: "Answer7"
    },
    {
        key: "Deck8",
        title: "Deck 8",
        question: "What is placeholder Question8",
        answer: "Answer8"
    }
];

class DeckListView extends Component {
    renderItem(item) {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                    this.props.navigation.navigate("DeckView", { deck: item })}
            >
                <Text style={{ fontSize: 30 }}>{item.title}</Text>
                <Text>23 cards</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <FlatList
                data={data}
                renderItem={({ item }) => this.renderItem(item)}
            />
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 100,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderColor: gray,
        borderBottomWidth: 1
    }
});

export default DeckListView;
