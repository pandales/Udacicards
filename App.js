import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux';
import DeckList from './decks/components/DeckList'
import { Constants } from 'expo';
import {purple} from "./utils/colors";
import decks from './decks/reducer'
import flashCards from './flashcards/reducer'
import ViewDeck from "./decks/components/ViewDeck";
import AddDeck from "./decks/components/ViewDeck";
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
  Decks: {
    screen: DeckList,
    navigationOptions: ({navigation}) => {

      return {
        headerTitle: 'Decks',
        headerRight: <AddButtonInHeader screen={'AddDeck'} navigation={navigation} />
      };
    },
  },
  ViewDeck: {
    screen: ViewDeck,
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      headerTitle: 'Add Deck',
    }
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