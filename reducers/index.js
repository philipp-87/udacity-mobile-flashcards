import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, SET_SCORE } from "../actions";
import _ from "lodash";

const initialState = {
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

function Flashcards(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            console.log(_.assign({}, state, action.decks));
            return {
                ...state,
                action
            };

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
