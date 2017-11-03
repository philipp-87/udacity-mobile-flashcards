# Flashcards
With the flashcards app, you can train yourself to your specific topics.
You can add decks for a specific topic and add questions and answers to them.
When you quiz yourself you will get a score for this deck.
The flashcards app supports iOS-only for the moment.

## Installation
* Download or Clone Repo,
* Run npm install in the root directory to install dependencies,
* Run npm start (or npm run ios),
* You will need the iOS simulator to run the app, otherwise choose npm start and scan the qr code with your smartphone 

## Features
### DeckListView
* Show all decks
* Select a deck to navigate to speficifc deck
* Shows if the deck was already quized with the last score, otherwise 'New'

### AddDeckView
* Add a new deck title, it will be shown in the DeckListView

### AddQuestionView
* Add new questions and answers to a deck 

### Quizview
* Go through all questions with the possiblity to show the answer and decide if it was correct or incorrect. At the end of the quiz you will get a score, which will be shown in the DeckListView

### Notifications
* The flashcards app will remind you every day to train yourself, when you haven't launch the app on that day

## create-react-native-app
This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

