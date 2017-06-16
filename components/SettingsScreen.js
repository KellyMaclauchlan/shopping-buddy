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
    this.state = {
      switchValue: true,
      timeFrames:["This Week", "This Month", "All"],
      week:[{text:"1"}, {text:"2"}, {text:"3"}],
      month:[{text:"5"}, {text:"4"}],
      allList:[{text:"1"}, {text:"2"}, {text:"3"},{text:"4"},{text:"5"},{text:"6"}],
      listSource: [{text:"1"}, {text:"2"}, {text:"3"},{text:"4"},{text:"5"},{text:"6"}],
      selectedIndex:2,
      items: _.map([
        'bread',
        'tea',
        'milk',
        'beef',
      ], text => ({ text, id: _.uniqueId() }) ),
      items2: _.map([
        'All',
        'Fridge',
        'Freezer',
        'Pantry',
      ], text => ({ text, id: _.uniqueId() }) ),

    };
  }
  static navigationOptions = {
    title: 'Settings',
  };  

  toggleCalendar(value){
    this.setState({switchValue: !this.state.switchValue });
  }

  

  removeItem(item){
    _.without(this.state.listSource, item)
  }

  addItemToCart(item){
    //Alert.alert("item added to cart",item.text);
  }




    render() {
      const { switchValue : showCalendar, timeFrames : buttons, selectedIndex : selectedIndex, items, items2 } = this.state; 
      return (
            <ScrollView>
            <Text>Groceries</Text>
            <View style={{flexDirection: 'row',justifyContent:'flex-end'}}>
            <Text style={{fontSize: 20}}>Add removed items to pantry </Text>
            <Switch 
              onValueChange={()=>{
                this.toggleCalendar()
              }} 
              value={this.state.switchValue}
            />
            </View>
            <View style={{flexDirection: 'row',justifyContent:'flex-end'}}>
            <Text style={{fontSize: 20}}>Use defalut grocery List </Text>
            <Switch 
              onValueChange={()=>{
                this.toggleCalendar()
              }} 
              value={this.state.switchValue}
            />
            </View>
            <PresentationalSettingScreen 
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
      onClickItem={ ({id}) =>{
        const { items } = this.state;
        this.setState({
          showRecipie: true
        });
        this.setState({
          selectedIndex: id
        });
      }}
    />


            <Text>Pantry</Text>
            <View style={{flexDirection: 'row',justifyContent:'flex-end'}}>
            <Text style={{fontSize: 20}}>add removed items to grocery list </Text>
            <Switch 
              onValueChange={()=>{
                this.toggleCalendar()
              }} 
              value={this.state.switchValue}
            />

            </View>
<PresentationalSettingScreen 
      onAddItem={(new_item)=>{
        this.setState({
          items2: items2.concat([{text: new_item, id: _.uniqueId()}]),
        })
      }}
      onDismissItem={ ({id}) =>{
        const { items } = this.state;
        this.setState({
          items2: _.reject(items, { id }),
        })
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