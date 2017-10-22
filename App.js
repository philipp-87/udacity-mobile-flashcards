import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DeckListView from "./components/DeckListView";
import DeckView from "./components/DeckView";
import NewDeckView from "./components/NewDeckView";
import NewQuestionView from "./components/NewQuestionView";
import QuizView from "./components/QuizView";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MainNavigator />
            </View>
        );
    }
}

const Tabs = TabNavigator({
    DeckListView: {
        screen: DeckListView,
        navigationOptions: {
            title: "Decks",
            tabBarLabel: "Decks",
            tabBarIcon: () => <Ionicons name="ios-bookmarks" size={30} />
        }
    },
    NewDeckView: {
        screen: NewDeckView,
        navigationOptions: {
            title: "Add Deck",
            tabBarLabel: "Add Deck",
            tabBarIcon: () => <FontAwesome name="plus-square" size={30} />
        }
    }
});

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs
    },
    DeckView: {
        screen: DeckView
    },
    NewQuestionView: {
        screen: NewQuestionView
    },
    QuizView: {
        screen: QuizView
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
