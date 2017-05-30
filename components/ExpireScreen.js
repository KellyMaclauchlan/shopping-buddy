import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image } from 'react-native';

export default class ExpireScreen extends React.Component {
  static navigationOptions = {
    title: 'Expire Dates',
  };

    render() {
      return (
            <View>
            <Text>expire screen</Text>
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