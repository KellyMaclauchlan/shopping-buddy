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


class PresentationalRecepieScreen extends React.Component {
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


export default class RecepieScreen extends React.Component {
  static navigationOptions = {
    title: 'Recipe',
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
      selectedItem:{name:"tuna",time:"40 min", ovenSetting:"400", steps:"cut the chicken, put it in a bowl",ingrediants:"eggs, chicken, beef"},
    };
  }

  render() {
    const { items, showRecipie } = this.state;
    return <View>
    { !showRecipie ? 
    <PresentationalRecepieScreen 
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
  :
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
  <Text> Cook Time </Text>
    <TextInput 
      style={inputStyle}
      value={this.state.selectedItem.cook}
      onChangeText={text => { 
      var ite
          ite=this.state.selectedItem;
          ite.cook=text;
          this.setState({selectedItem: ite});
        
      }}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <Text> Oven Setting </Text>
    <TextInput 
      style={inputStyle}
      value={this.state.selectedItem.ovenSetting}
      onChangeText={text => { 
      var ite
          ite=this.state.selectedItem;
          ite.oven=text;
          this.setState({selectedItem: ite});
        
      }}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <Text> Steps </Text>
    <TextInput 
      style={inputStyle}
      value={this.state.selectedItem.steps}
      onChangeText={text => { 
      var ite
          ite=this.state.selectedItem;
          ite.steps=text;
          this.setState({selectedItem: ite});
        
      }}
    />
    </View>

    <View style={{flexDirection:'row'}}>
    <Text> Ingrediants </Text>
    <TextInput 
      style={inputStyle}
      value={this.state.selectedItem.ingrediants}
      onChangeText={text => { 
      var ite
          ite=this.state.selectedItem;
          ite.ingrediants=text;
          this.setState({selectedItem: ite});
        
      }}
    />
    </View>




    </View>
  }

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