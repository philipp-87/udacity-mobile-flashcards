import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, SET_SCORE } from "../actions";
import _ from "lodash";
const uuid = require("uuid/v4");

const initialState = {
    decks: [
        {
            id: uuid(),
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
        {
            id: uuid(),
            title: "JavaScript",
            questions: [
                {
                    question: "What is a closure?",
                    answer:
                        "The combination of a function and the lexical environment within which that function was declared."
                }
            ]
        }
    ]
};

function Flashcards(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                decks: action.decks
            };

        case ADD_DECK:
            return {
                ...state,
                decks: state.decks.concat(action.deck)
            };
        case ADD_CARD:
            return {
                ...state,
                decks: state.decks.map(deck => {
                    if (deck.id === action.deckId) {
                        deck.questions.push(action.card);
                        return deck;
                    }
                    return deck;
                })
            };
        case SET_SCORE:
            return {
                ...state,
                decks: state.decks.map(deck => {
                    if (deck.id === action.deckId) {
                        if (_.isUndefined(deck.score)) {
                            deck["score"] = action.score;
                            return deck;
                        } else {
                            deck.score = action.score;
                            return deck;
                        }
                    }
                    return deck;
                })
            };
        default:
            return state;
    }
}

export default Flashcards;
