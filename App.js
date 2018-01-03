import React from 'react';
import { StyleSheet, View, StatusBar} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux';
import DeckList from './components/DeckList'
import { Constants } from 'expo';
import {purple} from "./utils/colors";
import decks from './reducer/index'
import ViewDeck from "./components/ViewDeck";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import QuizView from "./components/QuizView";
import { MaterialCommunityIcons, Ionicons, Entypo} from '@expo/vector-icons';
import {resetStorage} from "./utils/api";

import { AddButtonInHeader } from './GeneralComponents';
import { setLocalNotification, clearLocalNotification } from './utils/helpers';

const store = createStore(
  combineReducers({
    decks
  })
);

function CustomStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const DeckNavigator = TabNavigator({
  ViewDeck: {
    screen: ViewDeck,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Entypo name='archive' size={30} color={tintColor} />
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      tabBarLabel: 'Add Card',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    },
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Entypo name='open-book' size={30} color={tintColor} />
    },
  }
});
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
  ViewDeckTab: {
    screen: DeckNavigator,
  },

});

export default class App extends React.Component {
  componentDidMount() {
    // clearLocalNotification()
    //   .then(setLocalNotification)
    setLocalNotification();
   // resetStorage();
  }

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
