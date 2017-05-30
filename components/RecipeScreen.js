import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image } from 'react-native';

export default class RecepieScreen extends React.Component {
  static navigationOptions = {
    title: 'Recipe Calculator',
  };

    render() {
      return (
            <View>
            <Text>"Recipe screen"</Text>
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