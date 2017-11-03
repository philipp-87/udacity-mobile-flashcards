import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { TabNavigator, StackNavigator } from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DeckListView from "./components/DeckListView";
import DeckView from "./components/DeckView";
import NewDeckView from "./components/NewDeckView";
import NewQuestionView from "./components/NewQuestionView";
import QuizView from "./components/QuizView";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import promise from "redux-promise-middleware";
import { setNotification, clearNotification } from "./utils/notifications";

const middleware = applyMiddleware(promise(), logger);
const store = createStore(reducer, composeWithDevTools(middleware));

export default class App extends React.Component {
    componentDidMount() {
        clearNotification();
        setNotification();
    }
    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <MainNavigator />
                </View>
            </Provider>
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
