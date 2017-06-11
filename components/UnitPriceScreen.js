import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import UnitPriceItem from './UnitPriceItem'
export default class unitPriceScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      items:[{name:"Item1",price:"0.00",size:"1",unit:1},{name:"Item2",price:"1.00",size:"1",unit:2}],
    };
  }
  static navigationOptions = {
    title: 'Unit Price Calculator',
  };
  addItem(){
    this.state.items.push({name:"Item1",price:"0.00",size:"1"});
  }
  //https://coolors.co/310a31-c5cbd3-000000-b0b7b6-7cbab2 colors for app 
    render() {
      return (
            <ScrollView>
            <Text>"unit price screen"</Text>
            <FlatList
              data={this.state.items}
              renderItem={({item}) => <UnitPriceItem item={item}/>}
            />
            </ScrollView>
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