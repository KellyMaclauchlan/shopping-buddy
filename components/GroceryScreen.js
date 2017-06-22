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
import { AddRemoveList } from './AddRemoveList';



export default class GroceryScreen extends React.Component {
  static navigationOptions = {
    title: 'Grocery List',
  };
  constructor(props){
    super(props)
    this.state = {
      items: _.map([
        'Motherfucking cheetos',
        'Salad',
      ], text => ({ text, id: _.uniqueId() }) ),
    };
  }
  render() {
    const { items } = this.state;
    return <AddRemoveList 
      onAddItem={(new_item)=>{
        this.setState({
          items: items.concat([{text: new_item, id: _.uniqueId()}]),
        })
      }}
      onDismissItem={ ({id}) =>{
        const { items } = this.state;
        this.setState({
          items: _.reject(items, { id }),
        })
      }}
      items={items}
    />
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


