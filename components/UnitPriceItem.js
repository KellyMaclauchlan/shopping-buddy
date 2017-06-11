import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image, TextInput } from 'react-native';


const remove_img = require('../icons/remove.png');
const cart_img = require('../icons/cart.png');
const ItemStyle={
  marginVertical: 10,
  height: 60, 
  borderColor: '#bbb', 
  backgroundColor:'#fefefe',
  borderWidth: 1,
  paddingHorizontal: 20,
  justifyContent:'space-between',
};
export default class UnitPriceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }


    render() {
      return (
			<View style={ItemStyle}>
				<View style={{flexDirection:'row'}}>
					<Text>Name</Text>
					<TextInput style={{backgroundColor:'#7CBAB2'}} placeHolder="Item 1" onChangeText={(text) => this.setState({text})}/>
				</View>
				<View style={{flexDirection:'row'}}>
					<Text>Price</Text>
					<TextInput placeHolder='0.00'/>
				</View>
				<View style={{flexDirection:'row'}}>
					<Text>Size</Text>
					<TextInput placeHolder='1'/>
					<Text>Unit</Text>
				</View>
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

