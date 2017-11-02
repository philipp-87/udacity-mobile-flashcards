import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, SET_SCORE } from "../actions";
import _ from "lodash";

function Flashcards(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return _.assign({}, state, action.decks);

        case ADD_DECK:
            return {
                ...state,
                [action.deck.title]: {
                    title: action.deck.title,
                    questions: action.deck.questions
                }
            };
        case ADD_CARD:
            return {
                ...state,
                [action.deck.title]: {
                    ...state[action.deck.title],
                    questions: state[action.deck.title].questions.concat(
                        action.card
                    )
                }
            };
        case SET_SCORE:
            return {
                ...state,
                [action.deck.title]: {
                    ...state[action.deck.title],
                    score: action.score
                }
            };
        default:
            return state;
    }
}

export default Flashcards;
