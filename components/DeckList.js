import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet, TextInput, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import {loadDecks} from "../actions/index";
import {gray, lightGray, borderColor} from "../utils/colors";
import {MaterialIcons, Ionicons} from '@expo/vector-icons'
import {Platform} from 'react-native'
import {NavigationActions} from 'react-navigation';

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

function SearchBar({text, filterDecks}) {

  return (
    <View style={SearchBarStyles.container}>
      {Platform.OS === 'ios'
        ? <Ionicons style={SearchBarStyles.icon} name={'ios-search-outline'}/>
        : <MaterialIcons style={SearchBarStyles.icon} name={'search'}/>}
      <TextInput
        style={SearchBarStyles.input}
        onChangeText={(text) => filterDecks(text)}
        value={text}
        placeholder={'Search...'}
        placeholderTextColor={gray}/>
    </View>
  );
}

const ListItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderBottomColor: borderColor,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    padding: 5,

  }
});

function Item({item, navigation, opacity, onSelect}) {

  function onPressItem(item) {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 800
    }).start(() => {
      navigation && navigation.dispatch(
        NavigationActions.navigate({routeName: 'ViewDeckTab', params: {deck: item, onSelect}})
      );
      setTimeout(() => {
        opacity.setValue(1);
      }, 400);
    });

  }

  return (
    <TouchableOpacity key={item.id} style={ListItemStyle.container}
                      onPress={() => onPressItem(item)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.counter}>{item.cardsCount} cards</Text>
    </TouchableOpacity>
  );
}

class DeckList extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      opacity: new Animated.Value(0)
    };

    this.filterDecks = this.filterDecks.bind(this);
    this.updateList = this.updateList.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect = () => {
    this.updateList();
  };

  componentDidMount() {
    this.updateList();
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 800
    }).start();
  }

  filterDecks(query) {
    this.setState({query});
  }

  updateList() {
    this.props.getDecks();
  }

  render() {
    const {decks} = this.props;
    const {query, opacity} = this.state;
    const decksToShow = decks.filter((item) => {
        return item.title && (!query || item.title.includes(query));
    });

    return (
      <Animated.View style={{opacity}}>
        <FlatList data={decksToShow}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) => <Item item={item}
                                                opacity={opacity}
                                                onSelect={this.onSelect}
                                                navigation={this.props.navigation}/>}
                  ListHeaderComponent={<SearchBar text={this.state.query} filterDecks={this.filterDecks}/>}/>
      </Animated.View>

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