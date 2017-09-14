import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image } from 'react-native';


const remove_img = require('../icons/remove.png');
const cart_img = require('../icons/cart.png');
const ItemStyle={
  marginVertical: 0,
  height: 60, 
  borderColor: window.darkGrey, 
  backgroundColor: window.darkGrey,
  borderWidth: 0,
  paddingHorizontal: 20,
  paddingVertical: 10,
  flexDirection: 'row',
  justifyContent:'space-between',
  alignItems: 'center',
};
export default class ListItem extends React.Component {

    render() {
      return (
            <View style={ItemStyle}>
            <TouchableHighlight onPress={()=>this.props.remove(this.props.item)}>
                <Image style={styles.button} source={remove_img}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=> this.props.seeItem(this.props.item) }>
                <Text style={{fontSize: 16, backgroundColor:'#7CBAB2',width:200, textAlign:'center',borderRadius:10, paddingVertical:10,borderWidth: 1,overflow: 'hidden'}}>{this.props.item.text}</Text>
                </TouchableHighlight>
                <TouchableHighlight  onPress={()=> this.props.addToCart(this.props.item) }>
                <Image style={styles.button} source={cart_img}/>
                </TouchableHighlight>
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