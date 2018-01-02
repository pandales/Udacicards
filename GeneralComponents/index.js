import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialIcons, Ionicons} from '@expo/vector-icons'
import {Platform} from 'react-native';
import {NavigationActions} from 'react-navigation';

export function AddButtonInHeader({screen, navigation}) {

  function onPress() {
    navigation && navigation.dispatch(
      NavigationActions.navigate({routeName: screen})
    );
  }

  return (
    <TouchableOpacity onPress={() => onPress()}>
      {Platform.OS === 'ios'
        ? <Ionicons style={AddButtonInHeaderStyles.icon}
                    name={'ios-add'}/>
        : <MaterialIcons style={AddButtonInHeaderStyles.icon}
                         name={'add-box'}/>
      }
    </TouchableOpacity>
  );
}

const AddButtonInHeaderStyles = StyleSheet.create({
  icon: {
    fontSize: 40,
    paddingRight: 15
  }
});


