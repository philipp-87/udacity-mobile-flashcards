import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView
} from "react-native";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import _ from "lodash";
import { gray, purple, orange, white } from "../utils/colors";
import { getDecks } from "../utils/api";

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
    state = {
        decks: null
    };

    componentDidMount() {
        this.setState({
            decks: getDecks()
        });
    }

    renderItem(item) {
        console.log(item);
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                    this.props.navigation.navigate("DeckView", { deck: item })}
            >
                <View style={styles.iconWrapper} />
                <View style={styles.textWrapper}>
                    <Text style={{ fontSize: 30 }}>{item.title}</Text>
                    <Text>23 cards</Text>
                </View>
                <View style={styles.iconWrapper}>
                    <Entypo name="chevron-small-right" size={30} />
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        console.log(Object.keys(this.props.decks));
        console.log(this.props.decks);
        const { decks } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView>
                    {_.map(decks, (deck, index) => {
                        const deckSize = _.isEmpty(deck.questions)
                            ? "0"
                            : deck.questions.length;

                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.itemContainer}
                                onPress={() =>
                                    this.props.navigation.navigate("DeckView", {
                                        deck: deck
                                    })}
                            >
                                <View style={styles.iconWrapper} />
                                <View style={styles.textWrapper}>
                                    <Text style={{ fontSize: 30 }}>
                                        {deck.title}
                                    </Text>
                                    <Text>{deckSize} cards</Text>
                                </View>
                                <View style={styles.iconWrapper}>
                                    <Entypo
                                        name="chevron-small-right"
                                        size={30}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        decks: state
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    itemContainer: {
        flex: 1,
        height: 100,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderColor: gray,
        borderBottomWidth: 1,
        flexDirection: "row"
    },
    textWrapper: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    iconWrapper: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginRight: 10
    }
});

export default connect(mapStateToProps)(DeckListView);
