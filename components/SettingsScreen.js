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
  ScrollView,
  Switch,
  AsyncStorage,
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


class PresentationalSettingScreen extends React.Component {
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
      onClickItem,
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
      <REText h1> Recipies </REText>
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
                <Text
                  onPress={()=>onClickItem(item)}
                  children={item.text}
                />
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

export default class SettingsScreen extends React.Component {
  constructor(){
    super();
    var list, pantry, grocery, gList;
      AsyncStorage.getItem('groceryToPantry', (err, result) => {
            pantry = JSON.parse(result);
      
          });
      AsyncStorage.getItem('pantryCategoryList', (err, result) => {
            list = JSON.parse(result);
      
          });
      AsyncStorage.getItem('pantrytoGrocery', (err, result) => {
            grocery = JSON.parse(result);
      
          });
      AsyncStorage.getItem('defaultGroceryList', (err, result) => {
            gList = JSON.parse(result);
      
          });
    this.state = {
      switchValue: true,
      items:gList,
      items2: list,
      toGrocery:grocery,
      toPantry:pantry,

    };
  }
  static navigationOptions = {
    title: 'Settings',
  };  

  togglePantry(value){
    this.setState({toPantry: !this.state.toPantry });
    AsyncStorage.mergeItem('groceryToPantry',  JSON.stringify(this.state.toPantry), () => {
    
    });
  }
  toggleGrocery(value){
    this.setState({toGrocery: !this.state.toGrocery });
    AsyncStorage.mergeItem('pantrytoGrocery',  JSON.stringify(this.state.toGrocery), () => {
    
    });
  }

    render() {
      const { toGrocery, toPantry, timeFrames : buttons, selectedIndex : selectedIndex, items, items2 } = this.state; 
      return (
            <ScrollView>
            <Text>Groceries</Text>
            <View style={{flexDirection: 'row',justifyContent:'flex-end'}}>
            <Text style={{fontSize: 20}}>Add removed items to pantry </Text>
            <Switch 
              onValueChange={()=>{
                this.togglePantry()
              }} 
              value={toPantry}
            />
            </View>
            <View style={{flexDirection: 'row',justifyContent:'flex-end'}}>
            <Text style={{fontSize: 20}}>Defalut grocery List </Text>
            </View>
            <PresentationalSettingScreen 
              onAddItem={(new_item)=>{
                this.setState({
                  items: items.concat([{text: new_item, id: _.uniqueId()}]),
                })
                AsyncStorage.mergeItem('defaultGroceryList',  JSON.stringify(this.state.items), () => {    
                });
              }}
              onDismissItem={ ({id}) =>{
                const { items } = this.state;
                this.setState({
                  items: _.reject(items, { id }),
                })
                AsyncStorage.mergeItem('defaultGroceryList',  JSON.stringify(this.state.items), () => {    
                });
              }}
              items={items}
            />
            <Text>Pantry</Text>
            <View style={{flexDirection: 'row',justifyContent:'flex-end'}}>
            <Text style={{fontSize: 20}}>add removed items to grocery list </Text>
            <Switch 
              onValueChange={()=>{
                this.toggleGrocry();
              }} 
              value={toGrocery}
            />

            </View>
<PresentationalSettingScreen 
      onAddItem={(new_item)=>{
        this.setState({
          items2: items2.concat([{text: new_item, id: _.uniqueId()}]),
        })
        AsyncStorage.mergeItem('pantryCategoryList',  JSON.stringify(this.state.items2), () => {    
      });
      }}
      onDismissItem={ ({id}) =>{
        const { items2 } = this.state;
        this.setState({
          items2: _.reject(items2, { id }),
        })
        AsyncStorage.mergeItem('pantryCategoryList',  JSON.stringify(this.state.items2), () => {   
        });
      }}
      items={items2}
      
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