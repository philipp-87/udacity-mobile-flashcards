import { AsyncStorage } from "react-native";

const FLASHCARDS_STORAGE_KEY = "Udacity:flashcards";

export function getDecks() {
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

export function addCardToDeck(title, cardId, card) {
    return AsyncStorage.mergeItem(
        FLASHCARDS_STORAGE_KEY,
        JSON.stringify({
            [title]: {
                questions: {
                    [cardId]: card
                }
            }
        })
    );
}
