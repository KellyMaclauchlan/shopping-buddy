import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image } from 'react-native';

export default class UnitConvertScreen extends React.Component {
  static navigationOptions = {
    title: 'Unit Price Calculator',
  };

    render() {
      return (
            <View>
            <Text>"unit converter Screen"</Text>
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