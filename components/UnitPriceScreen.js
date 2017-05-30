import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image } from 'react-native';

export default class UnitPriceScreen extends React.Component {
  static navigationOptions = {
    title: 'Unit Price Calculator',
  };

    render() {
      return (
            <View>
            <Text>"unit price screen"</Text>
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