import { AsyncStorage } from "react-native";
import _ from "lodash";

const FLASHCARDS_STORAGE_KEY = "Udacity:flashcards";

export function clearAll() {
    return AsyncStorage.clear();
}

export function getDecks() {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(decks =>
        JSON.parse(decks)
    );
}

export function setDecks() {
    let decks = getInitialState();
    console.log(decks);
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(decks =>
        JSON.parse(decks)
    );
}

export function getDeck() {
    return;
}

export function saveDeck(title) {
    return AsyncStorage.mergeItem(
        FLASHCARDS_STORAGE_KEY,
        JSON.stringify({
            [title]: {
                title: title,
                questions: []
            }
        })
    );
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then(item => {
            let newItem = JSON.parse(item);
            newItem[title].questions.push(card);
            return newItem;
        })
        .then(newItem =>
            AsyncStorage.mergeItem(
                FLASHCARDS_STORAGE_KEY,
                JSON.stringify(newItem)
            )
        );
}

export function addScore(title, score) {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then(item => {
            let newItem = JSON.parse(item);
            newItem[title]["score"] = score;
            console.log(newItem);
            return newItem;
        })
        .then(newItem =>
            AsyncStorage.mergeItem(
                FLASHCARDS_STORAGE_KEY,
                JSON.stringify(newItem)
            )
        );
}

function getInitialState() {
    return {
        React: {
            title: "React",
            questions: [
                {
                    question: "What is React?",
                    answer: "A library for managing user interfaces"
                },
                {
                    question: "Where do you make Ajax requests in React?",
                    answer: "The componentDidMount lifecycle event"
                }
            ]
        },
        JavaScript: {
            title: "JavaScript",
            questions: [
                {
                    question: "What is a closure?",
                    answer:
                        "The combination of a function and the lexical environment within which that function was declared."
                }
            ]
        }
    };
}
