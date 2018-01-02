import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getAllDecks} from "../actions/index";
import {clearLocalNotification, setLocalNotification} from '../utils/helpers';
import {borderColor, white, red, green, orange} from "../utils/colors";
import {MaterialIcons, Ionicons} from '@expo/vector-icons';
import {NavigationActions} from 'react-navigation';


function CardView({showAnswer, card, toggleAnswer}){

  return (
    <View style={{alignItems: 'center'}}>
    {!showAnswer
    ?
      <View>
        <Text style={styles.cardText}>{card.question}</Text>
        <TouchableOpacity onPress={() => toggleAnswer()}>
          <Text style={styles.cardFlipper}>Show answer</Text>
        </TouchableOpacity>
      </View>
    :
      <View>
        <Text style={styles.cardText}>{card.answer}</Text>
        <TouchableOpacity onPress={() => toggleAnswer()}>
          <Text style={styles.cardFlipper}>Show question</Text>
        </TouchableOpacity>
      </View>}
    </View>
  );
}

function QuizEnded({navigation, score, reset}) {

  return(
    <View>
      <Text style={styles.cardText}>
        Score: {score}%
      </Text>
      <View style={styles.controlContainer}>
        <TouchableOpacity
          onPress={() => reset()}
          style={[styles.buttons, styles.incorrectButton]}>
          <Text style={[styles.buttonsText]}>Restart Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            reset();
            navigation.goBack()}
          }
          style={[styles.buttons, styles.correctButton, {backgroundColor: orange}]}>
          <Text style={[styles.buttonsText]}>Back to deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
class QuizView extends Component {

  constructor(props) {
    super(props);
    const {deck} = this.props.navigation.state.params;
    console.log(deck);
    const currentCard = deck.cards && deck.cards[0]
      ? deck.cards[0]
      : {};

    this.initialState = {
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
    this.toggleAnswer = this.toggleAnswer.bind(this);
    this.reset = this.reset.bind(this);
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    title: "Quiz"
  });

  incrementScore() {
    this.setState((state) => ({correctAnswers: state.correctAnswers + 1}));
    this.showNextCard();
  }

  reset(){
    this.setState(this.initialState);
  }

  showNextCard() {
    const {currentCardIndex} = this.state;
    const {deck} = this.props.navigation.state.params;
    const cards = deck.cards;
    if (cards[currentCardIndex + 1]) {
      this.setState((state) => ({
        currentCardIndex: state.currentCardIndex + 1,
        showAnswer: false,
        currentCard: cards[state.currentCardIndex + 1]
      }));
    }
    if (currentCardIndex === cards.length - 1) {
      this.setState({
        quizEnded: true
      });

      // I decided clear the notification wherever a user finish a quiz.
      clearLocalNotification()
        .then(setLocalNotification)
    }
  }

  toggleAnswer() {
    this.setState({showAnswer: !this.state.showAnswer});
  }

  goHome() {
    const {navigation} = this.props.navigation;
    navigation && navigation.dispatch(
      NavigationActions.navigate({routeName: 'DeckList'})
    );
  }

  render() {
    const {deck} = this.props.navigation.state.params;
    const {currentCard, showAnswer, currentCardIndex, correctAnswers, quizEnded} = this.state;
    const cards = deck.cards;
    const {navigation} = this.props;

    if(!cards || !cards.length){
      return (
        <Text style={{color:red, justifyContent: 'center', alignItems: 'center', fontSize: 20}}>There is not any card in this desk</Text>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'right'}}>{`${currentCardIndex + 1} / ${cards.length}`}</Text>
        <View style={[styles.center, {flex: 1,}]}>
          {quizEnded
            ? <QuizEnded
              score={(correctAnswers / cards.length) * 100}
              reset={this.reset}
              navigation={navigation}
              deck={navigation.state.params.deck}/>
            : <View>
              <CardView showAnswer={showAnswer}
                        card={cards[currentCardIndex]}
                        toggleAnswer={this.toggleAnswer} />
              <View style={styles.controlContainer}>
                <TouchableOpacity
                  style={[styles.buttons, styles.correctButton]}
                  onPress={() => this.incrementScore()}>
                  <Text style={[styles.buttonsText]}>Correct</Text></TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttons, styles.incorrectButton]}
                  onPress={() => this.showNextCard()}>
                  <Text style={styles.buttonsText}>Incorrect</Text></TouchableOpacity>
              </View>
            </View>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    //alignItems: 'center',
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
    marginTop: 20,
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
    fontSize: 40,
    textAlign: 'center'
  },
  cardFlipper: {
    color: red,
    textAlign: 'center'
  }
});

const mapStateToProps = (state, props) => ({
  decks: state.decks
});

const mapDispatchToProps = dispatch => ({
  getDecks: () => getAllDecks(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);