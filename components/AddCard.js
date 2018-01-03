import React, {Component} from 'react';
import {
  KeyboardAvoidingView, View, Text, StyleSheet, TextInput,
  Keyboard, TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {getAllDecks} from "../actions/index";
import {addCard} from "../utils/api";
import {gray, lightGray, borderColor, blue, red} from "../utils/colors";
import {MaterialIcons, Ionicons} from '@expo/vector-icons';

class AddCard extends Component {

  constructor() {
    super();

    this.initialState = {
      question: '',
      answer: '',
    };
    this.state = this.initialState;

    this.saveCard = this.saveCard.bind(this);
    this.reset = this.reset.bind(this);
  }

  saveCard() {
    Keyboard.dismiss();
    this.setState(this.initialState);

    const {updateStore, navigation} = this.props;
    const deck = navigation.state.params.deck;

    if (!deck.cards) deck.cards = [];

    deck.cards.push(this.state);
    deck.cardsCount = deck.cards.length;

    addCard(deck)
      .then(decks => updateStore(decks));

    navigation.state.params.onSelect({deck: deck});
    //navigation.navigate('ViewDeckTab', {deck: deck});
    navigation.goBack();
  };

  reset() {
    Keyboard.dismiss();
    this.setState(this.initialState);
  }

  handleQuestionChange(question) {
    this.setState({question});
  }

  handleAnswerChange(answer) {
    this.setState({answer});
  }

  render() {

    const {question, answer} = this.state;

    return (
      <KeyboardAvoidingView behavior={'position'} style={styles.container}>
        <Text style={styles.title}> ADD CARD</Text>
        <TextInput
          style={styles.input}
          placeholder={'Question'}
          onChangeText={(text) => {
            this.handleQuestionChange(text)
          }}
          value={question}
        />
        <TextInput
          style={styles.input}
          placeholder={'Answer'}
          onChangeText={(text) => {
            this.handleAnswerChange(text)
          }}
          value={answer}
        />

        <View style={styles.controlContainer}>
          <TouchableOpacity
            style={[styles.submitButton]}
            onPress={() => this.saveCard()}>
            <Text style={[styles.buttonsText]}>Submit</Text></TouchableOpacity>
          <TouchableOpacity
            style={[styles.resetButton]}
            onPress={() => this.reset()}>
            <Text style={styles.buttonsText}>Reset</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  submitButton: {
    backgroundColor: blue,
    flex: 1,
    marginRight: 5,
    borderRadius: 5,
  },
  disableSubmitButton: {
    backgroundColor: gray,
    opacity: 50,
  },
  resetButton: {
    backgroundColor: red,
    flex: 1,
    marginLeft: 5,
    borderRadius: 5,

  },
  buttonsText: {
    fontSize: 25,
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
  },
  disableButtonText: {
    color: lightGray,
  }
});

const mapStateToProps = (state, props) => ({
  decks: state.decks
});

const mapDispatchToProps = dispatch => ({
  updateStore: (decks) => dispatch(getAllDecks(decks))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);