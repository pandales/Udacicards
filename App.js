import React from 'react';
import { StyleSheet, View, StatusBar} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux';
import DeckList from './decks/components/DeckList'
import { Constants } from 'expo';
import {purple} from "./utils/colors";
import decks from './decks/reducer'
import flashCards from './flashcards/reducer'
import ViewDeck from "./decks/components/ViewDeck";
import AddDeck from "./decks/components/AddDeck";
import AddCard from "./decks/components/AddCard";
import QuizView from "./decks/components/QuizView";

import { AddButtonInHeader } from './GeneralComponents';

const store = createStore(
  combineReducers({
    decks,
    flashCards,
  })
);

function CustomStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: ({navigation}) => {

      return {
        headerTitle: 'Decks',
        headerRight: <AddButtonInHeader screen={'AddDeck'} navigation={navigation} />
      };
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      headerTitle: 'New Deck',
    }
  },
  ViewDeck: {
    screen: ViewDeck,
  },
  AddCard: {
    screen: AddCard,
  },
  QuizView: {
    screen: QuizView,
  }

});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <CustomStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {

  }
});
