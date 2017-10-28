import { getDecks } from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const SET_SCORE = "SET_SCORE";

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    };
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    };
}

export function addCard(card, deckId) {
    console.log(card);
    console.log(deckId);
    return {
        type: ADD_CARD,
        card,
        deckId
    };
}

export function setScore(score, deckId) {
    return {
        type: SET_SCORE,
        score,
        deckId
    };
}
