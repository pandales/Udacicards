import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {gray, lightGray, borderColor, orange, green} from "../../utils/colors";
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import {NavigationActions} from 'react-navigation'


class ViewDeck extends Component {
  constructor() {
    super();
    this.navigateTo = this.navigateTo.bind(this);
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.deck.title
  });

  onSelect = data => {
    this.setState(data);
  };

  navigateTo(screen, params = {}){
    const {navigation} = this.props;
    params.onSelect = this.onSelect;

    navigation && navigation.dispatch(
      NavigationActions.navigate({ routeName: screen, params: params})
    );
  }

  render() {
    const {deck} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.counter}>{deck.cardsCount} cards</Text>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => this.navigateTo('AddCard', {deck: deck})}
            style={[styles.buttons, styles.addCardButton]}>
            <Text style={[styles.buttonsText]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.navigateTo('QuizView', {deck: deck})}
            style={[styles.buttons,styles.startQuizButton]}>
            <Text style={[styles.buttonsText]}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding:20

  },
  title: {
    fontSize: 50,
    textAlign: 'center',
  },
  counter: {
    fontSize: 25,
    color: gray,
    textAlign: 'center',
  },
  controls: {
    marginTop: 30,
  },
  buttons: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  addCardButton: {
    backgroundColor:orange
},
  startQuizButton: {
    backgroundColor: green,
  },
  buttonText: {
    fontSize: 30
  }
});

export default ViewDeck;