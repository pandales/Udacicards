import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { loadDecks} from "../actions";
import {gray, lightGray, borderColor} from "../../utils/colors";
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import {Platform} from 'react-native'
import { NavigationActions } from 'react-navigation';

const SearchBarStyles = StyleSheet.create({
  container: {
    height: 40,
    borderColor: borderColor,
    borderWidth: 1,
    justifyContent: 'flex-start',
    backgroundColor: lightGray,
    flexDirection: 'row'
  },
  input: {
    fontSize: 25,
    textAlign: 'center'
  },
  icon: {
    fontSize: 40,
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    color: gray
  },
});

function SearchBar(props) {

  return (
    <View style={SearchBarStyles.container}>
      {Platform.OS === 'ios'
      ?<Ionicons style={SearchBarStyles.icon} name={'ios-search-outline'}/>
      : <MaterialIcons style={SearchBarStyles.icon} name={'search'}/>}
      <TextInput
        style={SearchBarStyles.input}
        value={props.text}
        placeholder={'Search...'}
        placeholderTextColor={gray}/>
    </View>
  );
}

const ListItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

function Item({item, navigation}) {

  function onPressItem(item){
    navigation && navigation.dispatch(
      NavigationActions.navigate({ routeName: 'ViewDeck', params:{deck: item}})
    );
  }

  return (
    <TouchableOpacity style={ListItemStyle.container}
                      onPress={() => onPressItem(item)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.counter}>{item.cardsCount} cards</Text>
    </TouchableOpacity>
  );
}

class DeckList extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    this.updateList();
  }

  updateList() {
    this.props.getDecks();
  }

  render() {
    const {decks} = this.props;

    return (
      <FlatList data={decks}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => <Item
                  item={item}
                  navigation={this.props.navigation} />}
                ListHeaderComponent={<SearchBar text={''}/>} />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 30
  },
  counter: {
    fontSize: 15
  }
});

const mapStateToProps = (state, props) => ({
  decks: state.decks
});

const mapDispatchToProps = dispatch => ({
  getDecks: () => loadDecks(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);