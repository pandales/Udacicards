import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getAllDecks} from "../actions";
import {clearLocalNotification, setLocalNotification} from '../../utils';
import { borderColor, white, red, green} from "../../utils/colors";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import {NavigationActions} from 'react-navigation';

class QuizView extends Component {

  constructor(props) {
    super(props);
    const {deck} = this.props.navigation.state.params;
    const currentCard = deck.cards && deck.cards[0]
      ? deck.cards[0]
      : {};

    this.initialState = {
      cards: deck.cards,
      correctAnswers: 0,
      currentCard: currentCard,
      currentCardIndex: 0,
      showAnswer: false,
      quizEnded: false,
    };

    this.state = this.initialState;
    this.goHome = this.goHome.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
    this.showNextCard = this.showNextCard.bind(this);
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.deck.title + " - Quiz"
  });

  incrementScore(){
    this.setState((state) => ({correctAnswers: state.correctAnswers + 1}));
    this.showNextCard();
  }

  showNextCard(){
    const {cards, currentCardIndex} = this.state;

    if(cards[currentCardIndex + 1]){
      this.setState((state) => ({
        currentCardIndex: state.currentCardIndex + 1,
        showAnswer: false,
        currentCard: cards[state.currentCardIndex + 1]
      }));
    }
    if(currentCardIndex === cards.length - 1){
      this.setState({
        quizEnded: true
      });

      // I decided clear the notification wherever a user finish a quiz.
      clearLocalNotification()
        .then(setLocalNotification)
    }
  }

  toggleAnswer(){
    this.setState({showAnswer: !this.state.showAnswer});
  }

  goHome(){
    const {navigation} = this.props.navigation;
    navigation && navigation.dispatch(
      NavigationActions.navigate({ routeName: 'DeckList'})
    );
  }

  render() {
    const {currentCard, showAnswer, currentCardIndex, cards, correctAnswers, quizEnded} = this.state;

    return (
      <View style={styles.container}>
        <Text>{`${currentCardIndex + 1} / ${cards.length}`}</Text>
        {quizEnded
        ? <Text>
          Score: {(correctAnswers / cards.length)*100}%
          </Text>
         :  <View>
            {!showAnswer
              ? <View>
                <Text style={styles.cardText}>{currentCard.question}</Text>
                <TouchableOpacity onPress={() => this.toggleAnswer()}>
                  <Text style={styles.cardFlipper}>Show answer</Text>
                </TouchableOpacity>
              </View>
              : <View>
                <Text style={styles.cardText}>{currentCard.answer}</Text>
                <TouchableOpacity onPress={() => this.toggleAnswer()}>
                  <Text style={styles.cardFlipper}>Show question</Text>
                </TouchableOpacity>
              </View>}
            <View style={styles.controlContainer}>
              <TouchableOpacity
                style={[ styles.buttons, styles.correctButton]}
                onPress={() => this.incrementScore()}>
                <Text style={[styles.buttonsText]}>Correct</Text></TouchableOpacity>
              <TouchableOpacity
                style={[ styles.buttons, styles.incorrectButton]}
                onPress={() => this.showNextCard()}>
                <Text style={styles.buttonsText}>Incorrect</Text></TouchableOpacity>
            </View>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  input: {
    marginTop: 20,
    fontSize: 25,
    borderColor: borderColor,
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
  },
  controlContainer: {
    marginTop: 10,
    justifyContent: 'space-between',

  },
  buttons: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  correctButton: {
    backgroundColor: green,
    borderRadius: 5,
  },

  incorrectButton: {
    backgroundColor: red,
    borderRadius: 5,

  },
  buttonsText: {
    fontSize: 30,
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
    color: white,
  },
  cardText: {
    fontSize: 40
  },
  cardFlipper: {
    color: red,
  }
});

const mapStateToProps = (state, props) => ({
  decks: state.decks
});

const mapDispatchToProps = dispatch => ({
  getDecks: () => getAllDecks(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);