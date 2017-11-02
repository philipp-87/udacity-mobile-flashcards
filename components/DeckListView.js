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
import { getDecks, clearAll, setDecks } from "../utils/api";
import { receiveDecks } from "../actions";
import _ from "lodash";
import { gray, purple, orange, white } from "../utils/colors";

class DeckListView extends Component {
    state = {
        decks: null
    };

    componentDidMount() {
        if (_.isEmpty(this.props.decks)) {
            getDecks().then(decksFromAsyncStorage => {
                this.props.receiveDecks(decksFromAsyncStorage);
            });
        }
        return;
    }

    getScore(deck) {
        if (_.isUndefined(deck.score)) {
            return "New";
        } else {
            return deck.score / deck.questions.length * 100 + "%";
        }
    }

    render() {
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
                                    <View style={styles.scoreWrapper}>
                                        <Text>{this.getScore(deck)}</Text>
                                    </View>
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
    return {
        decks: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        receiveDecks: decks => dispatch(receiveDecks(decks))
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
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginRight: 10
    },
    scoreWrapper: {
        height: 50,
        width: 50,
        flexDirection: "column",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        backgroundColor: orange,
        borderRadius: 50
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView);
