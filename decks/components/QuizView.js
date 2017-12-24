import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getAllDecks} from "../actions";
import {gray, lightGray, borderColor, orange, green} from "../../utils/colors";
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

class QuizView extends Component {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.deck.title
  });

  navigateTo(screen, parameters = {}){
    const {navigation} = this.props.navigation;
    navigation && navigation.dispatch(
      NavigationActions.navigate({ routeName: 'ViewDeck', params:{deck: item}})
    );
  }

  render() {
    const {deck} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz for: {deck.title}</Text>
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

const mapStateToProps = (state, props) => ({
  decks: state.decks
});

const mapDispatchToProps = dispatch => ({
  getDecks: () => getAllDecks(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);