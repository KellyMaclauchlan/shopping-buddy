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
    var list; 
    AsyncStorage.getItem('recipeList', (err, result) => {
            list = JSON.parse(result);
      
          });
    this.state = {
      items: list,
      showRecipie:false,
      selectedIndex:0,
      selectedItem:{text:"tuna",time:"40 min", ovenSetting:"400", steps:"cut the chicken, put it in a bowl",ingrediants:"eggs, chicken, beef"},
    };
  }

  render() {
    const { items, showRecipie } = this.state;
    return <View>
    { !showRecipie ? 
    <PresentationalRecepieScreen 
      onAddItem={(new_item)=>{
        var item ={text:new_item,time:"", ovenSetting:"", steps:"",ingrediants:""};
        this.setState({
          items: items.concat([item]),
        })
        AsyncStorage.mergeItem('recipeList',  JSON.stringify(this.state.items), () => {
    
        });
       this.setState({
          selectedItem:item,
          selectedIndex: items.indexOf(item),
          showRecipie: true
        })
      }}
      onDismissItem={ ({id}) =>{
        const { items } = this.state;
        this.setState({
          items: _.reject(items, { id }),
        })
        AsyncStorage.mergeItem('recipeList',  JSON.stringify(this.state.items), () => {
    
        });
      }}
      items={items}
      onClickItem={ ({id}) =>{
        const { items } = this.state;
        this.setState({
          selectedItem:item,
          selectedIndex: items.indexOf(item),
          showRecipie: true
        })
      }}
    />
  :
  <View>
  <Button
   title = "Back"
    onPress= {()=> this.setState({
                showRecipie:false,
                })}
              />
  
  <Text>{this.state.selectedIndex}</Text>
  <View style={{flexDirection:'row'}}>
  <Text> Name </Text>
    <TextInput 
      style={inputStyle}
      value={this.state.selectedItem.text}
      onChangeText={text => { 
      var ite
          ite=this.state.selectedItem;
          ite.text=text;
          this.setState({selectedItem: ite});
          var itel;
          itel = this.state.items;
          itel[this.state.selectedIndex]=ite;
          this.setState({items:itle});
        AsyncStorage.mergeItem('recipeList',  JSON.stringify(this.state.items), () => {
        });
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
          var itel;
          itel = this.state.items;
          itel[this.state.selectedIndex]=ite;
          this.setState({items:itle});
        AsyncStorage.mergeItem('recipeList',  JSON.stringify(this.state.items), () => {
        });
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
          var itel;
          itel = this.state.items;
          itel[this.state.selectedIndex]=ite;
          this.setState({items:itle});
        AsyncStorage.mergeItem('recipeList',  JSON.stringify(this.state.items), () => {
        });
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
          var itel;
          itel = this.state.items;
          itel[this.state.selectedIndex]=ite;
          this.setState({items:itle});
        AsyncStorage.mergeItem('recipeList',  JSON.stringify(this.state.items), () => {
        });
      }}
    />
    </View>

    <View style={{flexDirection:'row'}}>
    <Text> Ingrediants </Text>
    <TextInput 
      style={inputStyle}
      value={this.state.selectedItem.ingrediants}
      onChangeText={text => { 
      var ite;
          ite=this.state.selectedItem;
          ite.ingrediants=text;
          this.setState({selectedItem: ite});
          var itel;
          itel = this.state.items;
          itel[this.state.selectedIndex]=ite;
          this.setState({items:itle});
        AsyncStorage.mergeItem('recipeList',  JSON.stringify(this.state.items), () => {
        });
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