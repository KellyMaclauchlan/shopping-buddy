import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image } from 'react-native';

export default class PantryScreen extends React.Component {
  static navigationOptions = {
    title: 'In your pantry',
  };

    render() {
      return (
            <View>
            <Text>"pantry screen"</Text>
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