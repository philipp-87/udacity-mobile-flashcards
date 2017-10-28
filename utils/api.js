import { AsyncStorage } from "react-native";

const FLASHCARDS_STORAGE_KEY = "Udacity:flashcards";

export function getDecks() {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results =>
        JSON.parse(results)
    );
}

export function getDeck() {
    return;
}

export function saveDeckTitle({ title }) {
    return AsyncStorage.mergeItem(
        FLASHCARDS_STORAGE_KEY,
        JSON.stringify({
            [title]: title
        })
    );
}

export function addCardToDeck() {
    return;
}
