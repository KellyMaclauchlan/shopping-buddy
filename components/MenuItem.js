import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image } from 'react-native';

export default class MenuIcon extends React.Component {

    render() {
      return (
            <TouchableHighlight onPress={this.props.onPress}>
              <View style={{alignItems:'center'}}>
                <Image style={{width: 110, height: 110}} source={this.props.image}/>
              </View>
            </TouchableHighlight>
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
