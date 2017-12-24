import React, {Component} from 'react';
import {KeyboardAvoidingView,View, Text, StyleSheet, TextInput,
  Keyboard, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getAllDecks} from "../actions";
import {addDeck} from "../../utils/api";
import {gray, lightGray, borderColor, blue, red} from "../../utils/colors";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';



class AddCard extends Component {

  constructor(){
    super();

  }

  saveCard(){
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
  }



  render() {


    return (
      <KeyboardAvoidingView behavior={'position'} style={styles.container}>
        <Text style={styles.title}> ADD CARD</Text>

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
});

const mapStateToProps = (state, props) => ({
  decks: state.decks
});

const mapDispatchToProps = dispatch => ({
  updateStore: (decks) => dispatch(getAllDecks(decks))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);