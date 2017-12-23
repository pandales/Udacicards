import React, {Component} from 'react';
import {KeyboardAvoidingView,View, Text, StyleSheet, TextInput,
  Keyboard, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getAllDecks} from "../actions";
import {addDeck} from "../../utils/api";
import {gray, lightGray, borderColor, blue, red} from "../../utils/colors";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';



class AddDeck extends Component {

  constructor(){
    super();
    this.state = {
      title: '',
      isUnique: true
    };
    this.saveDeck = this.saveDeck.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  saveDeck(){
    Keyboard.dismiss();
    this.setState({title: ''});

    const {updateStore, navigation} = this.props;

    addDeck(this.state.title)
       .then(decks => updateStore(decks));

    navigation.dispatch(
      NavigationActions.navigate({ routeName: 'DeckList'})
    );
  };

  handleTitleChange(title){
    this.setState({title});
    this.setState({isUnique: this._isTitleUnique(title)});
  }

  _isTitleUnique(title) {
    const isUnique = this.props.decks.reduce((checker, currentValue) => {
      return checker && (currentValue.title !== title)
    }, true);

    return isUnique;
  }

  render() {

    const {isUnique, title} = this.state

    return (
      <KeyboardAvoidingView behavior={'position'} style={styles.container}>
        <Text style={styles.title}> What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          placeholder={'Deck Title'}
          onChangeText={(title) => {this.handleTitleChange(title)}}
          value={title}
        />

        <Text stlye={{fontSize: 12, color: red}}>{!isUnique? 'There is another deck with this title': ''}</Text>

        <View style={styles.controlContainer}>
          <TouchableOpacity
            style={isUnique
              ? styles.submitButton
              : [styles.submitButton, styles.disableSubmitButton]}
            onPress={() => isUnique && this.saveDeck()}>
            <Text style={isUnique
              ? styles.buttonsText
              : [styles.buttonsText, styles.disableButtonText]}>Submit</Text></TouchableOpacity>
          <TouchableOpacity
            style={[styles.cancelButton]}
            onPress={() => Keyboard.dismiss()}>
            <Text style={styles.buttonsText}>Cancel</Text></TouchableOpacity>
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
    flex: 1,
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
  cancelButton: {
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

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);