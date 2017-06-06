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


class PresentationalGroceryScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      add_item_text : null,
    }
  }
  render(){
    const { 
      items,
      onDismissItem,
    } = this.props;
    const {
      add_item_text,
    } = this.state;
    return (  
    <View 
      style={{
        paddingHorizontal: 25,
      }}
    >
      <REText h1> Grocery List </REText>
      <TextInput 
        placeholder="Add an item"
        placeholderTextColor="#999"
        value={add_item_text}
        style={
          ItemStyle
        }
        onChangeText={text => this.setState({add_item_text: text })}
        onKeyPress={(event)=> {
          if(event.nativeEvent.key == 'Enter' && !_.isEmpty(add_item_text) ){
            this.addItem(add_item_text);
          }
        }}
        /> 
        <FlatList
          data={items}
          renderItem={({item}) => (
            <TodoRect key={item.text}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text>{item.text}</Text>
                <View 
                  style={{color: 'red'}}
                  
                >
                  <Text
                    onPress={()=>onDismissItem(item)}
                    children={"X"}
                  />
                </View>
              </View>
            </TodoRect> 
          )}
        />
    </View>);
  }
  addItem(item_text){
    this.props.onAddItem(item_text);
    this.setState({
      add_item_text: null,
    })
  }
} 

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
    return <PresentationalGroceryScreen 
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


