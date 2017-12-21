import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {getAllDecks} from "../actions";
import {gray, lightGray, borderColor} from "../../utils/colors";
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import {Platform} from 'react-native'


class ViewDeck extends Component {
  constructor() {
    super();

  }

  render() {

    return (
      <View>
        <Text>VIEW DECK</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 30
  }
});

const mapStateToProps = (state, props) => ({
  decks: state.decks
});

const mapDispatchToProps = dispatch => ({
  getDecks: () => getAllDecks(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewDeck);