import React from 'react';

import { 
  StyleSheet, 
  Text,
  View,  
  Button, 
  Alert, 
  TouchableHighlight, 
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { 
  List as REList,
  ListItem as REListItem,
  Button as REButton,
  Text as REText,
  Icon,
} from 'react-native-elements';

const _ = require('lodash');
const inputStyle={
  borderColor: '#bbb', 
  backgroundColor:'#fefefe',
  borderWidth: 1,
  width:50,
  justifyContent:'space-between',
};

const TodoRect = ({children}) => (
  <View style={ItemStyle}>
    {children}
  </View>
);

const ItemStyle={
  marginVertical: 0,
  height: 60, 
  borderColor: '#bbb', 
  backgroundColor:'#fefefe',
  borderWidth: 1,
  paddingHorizontal: 20,
  paddingVertical: 10,
};


export default class ItemScreen extends React.Component {
  static navigationOptions = {
    title: 'Item',
  };
  constructor(props){
    super(props)
    this.state = {
      items: _.map([
        'All',
        'Fridge',
        'Freezer',
        'Pantry',
      ], text => ({ text, id: _.uniqueId() }) ),
      showRecipie:false,
      selectedIndex:0,
      selectedItem:{name:"tuna can",quantity:"4", expireDate:"mar 14 2018", pantrySection:"fridge",notes:"this is good"},
    };
  }

  render() {
    const { items, showRecipie } = this.state;
    return <View>
  <View>
  <Text>{this.state.selectedIndex}</Text>
  <View style={{flexDirection:'row'}}>
  <Text> Name </Text>
    <TextInput 
      style={inputStyle}
      value={this.state.selectedItem.name}
      onChangeText={text => { 
      var ite
          ite=this.state.selectedItem;
          ite.name=text;
          this.setState({selectedItem: ite});
        
      }}
    />
    </View>
    <View style={{flexDirection:'row'}}>
  <Text> Quantity </Text>
    <TextInput 
      style={inputStyle}
      value={this.state.selectedItem.q}
      onChangeText={text => { 
      var ite
          ite=this.state.selectedItem;
          ite.quantity=text;
          this.setState({selectedItem: ite});
        
      }}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <Text> Expire Date </Text>
    <TextInput 
      style={inputStyle}
      value={this.state.selectedItem.expireDate}
      onChangeText={text => { 
      var ite
          ite=this.state.selectedItem;
          ite.expireDate=text;
          this.setState({selectedItem: ite});
        
      }}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <Text> Notes </Text>
    <TextInput 
      style={inputStyle}
      value={this.state.selectedItem.notes}
      onChangeText={text => { 
      var ite
          ite=this.state.selectedItem;
          ite.notes=text;
          this.setState({selectedItem: ite});
        
      }}
    />
    </View>


    </View>
  

    </View>
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