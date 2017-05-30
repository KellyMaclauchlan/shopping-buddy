import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image } from 'react-native';

export default class GroceryScreen extends React.Component {
  static navigationOptions = {
    title: 'Grocery List',
  };

    render() {
      return (
            <View>
            <Text>"grocery list  screen"</Text>
            </View>
      );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});