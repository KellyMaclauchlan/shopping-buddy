import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image, TextInput } from 'react-native';
import _ from 'lodash';

const remove_img = require('../icons/remove.png');
const cart_img = require('../icons/cart.png');

const itemStyle={
  marginVertical: 20,
  height: 200, 
  borderColor: '#bbb', 
  backgroundColor:window.blue,
  borderWidth: 1,
  paddingHorizontal: 20,
  justifyContent:'space-between',
};
const inputStyle={
  backgroundColor:'#fefefe',
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#999',
  borderWidth: 1,
  display: 'block',
  fontSize: 18,
  height:35,
  width:70
};

export default class UnitPriceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rightText: '',
      leftText: '',
      endText:'',
    };
  }


  render() {
    return (
		<View style={itemStyle}>
			<View style={{flexDirection:'row'}}>
				<Text>Name:</Text>
        <TextInput 
          style={inputStyle}
          placeholder="item 1"
          value={this.state.leftText}
          onChangeText={text => { 
            this.setState({leftText: text});
          }}
        />
			</View>
			<View style={{flexDirection:'row'}}>
				<Text>Price:</Text>
        <TextInput 
          style={inputStyle}
          placeholder="0.00"
          value={this.state.endText}
          onChangeText={text => { 
            this.setState({endText: text});
          }}
        />
			</View>
			<View style={{flexDirection:'row'}}>
				<Text>Size:</Text>
        <TextInput 
          style={inputStyle}
          placeholder="1"
          value={this.state.rightText}
          onChangeText={text => { 
            this.setState({rightText: text});
          }}
        />
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

