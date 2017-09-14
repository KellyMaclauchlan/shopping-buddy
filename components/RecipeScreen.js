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
  ScrollView,
} from 'react-native';
import {
  List as REList,
  ListItem as REListItem,
  Button as REButton,
  Text as REText,
  Icon,
} from 'react-native-elements';
import { AddRemoveList } from './AddRemoveList';
const _ = require('lodash');

const colours = {blue :"#7cbab2",
    darkGrey : '#b0b7b6',
    black : '#030312',
    lightGrey : '#c5cbd3',
    purple : '#310a31',
    warmPurple : '#432043'}


const inputStyle={
  backgroundColor:'#fefefe',
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#999',
  borderWidth: 1,
  display: 'block',
  fontSize: 18,
  height:35,
};



const ItemStyle={
  marginVertical: 20,
  display: 'flex',
  flexDirection: 'column',
};

const input_header_style={
  fontWeight: 'bold',
  fontSize: 20,
}

export default class RecepieScreen extends React.Component {
  static navigationOptions = {
    title: 'Recipe',
    headerTintColor: window.black,
    headerStyle:{ backgroundColor: window.lightGrey},
  };
  constructor(props){
    super(props)

    this.state = {
      items: [],
      showRecipie:false,
      selectedIndex:0,
      isSaving:false,
      isLoading: true,
      selectedItem:null
    };
  }

    componentWillMount(){
    AsyncStorage.multiGet(['recipeList']).then(results => {
        const [[k1,recipe_json]] = results;
        const list = JSON.parse(recipe_json);

        this.setState({
          items: list,
          isLoading: false,
        });

    });
  }

  render() {
    const { items, showRecipie } = this.state;
    if(this.state.isSaving || this.state.isLoading){
        return <Text> Loading... </Text>;
      }
    return <View style={{backgroundColor: window.darkGrey}}>
    { !showRecipie ?
    <AddRemoveList
      onAddItem={(new_item)=>{
        //this.setState({isSaving:true});
        var item ={text:new_item,time:"", ovenSetting:"", steps:"",ingrediants:"", id: window.kelly_uID(),};

        ites=this.state.items.concat([item])
        this.setState({
          items: ites,
          selectedIndex: items.indexOf(item),
          showRecipie: true,
          selectedItem:item,
        })
        AsyncStorage.multiSet([['recipeList', JSON.stringify(ites)]]).then(()=>{
          this.setState({
            isSaving: false,
          });
        });
      }}

      onDismissItem={ ({id}) =>{
        const { items } = this.state;
        this.setState({isSaving:true});
        this.setState({
          items: _.reject(items, { id }),
        })
        AsyncStorage.multiSet([['recipeList', JSON.stringify(this.state.items)]]).then(()=>{
          this.setState({
            isSaving: false,
          });
          });
      }}
      items={items}
      onClickItem={ ({id}) =>{
        const { items } = this.state;
        this.setState({
          selectedItem:id,
          selectedIndex: items.indexOf(id),
          showRecipie: true
        })
      }}
    />
  :
  <ScrollView>
  <Button
   title = "Back"
    onPress= {()=> this.setState({
                showRecipie:false,
                })}
              />

  <View style={ItemStyle}>
    <Text style={input_header_style}> Name </Text>
    <TextInput
      style={inputStyle}
      value={this.state.selectedItem.text}
      onChangeText={text => {
        this.setState({isSaving:true});
      var ite
          ite=this.state.selectedItem;
          ite.text=text;
          this.setState({selectedItem: ite});
          var itel;
          itel = this.state.items;
          itel[this.state.selectedIndex]=ite;
          this.setState({items:itel});
        AsyncStorage.multiSet([['recipeList', JSON.stringify(this.state.items)]]).then(()=>{
          this.setState({
            isSaving: false,
          });
          });
      }}
      />
    </View>

  <View style={ItemStyle}>
    <Text style={input_header_style}> Cook Time </Text>
    <TextInput
      style={inputStyle}
      value={this.state.selectedItem.cook}
      onChangeText={text => {
        this.setState({isSaving:true});
      var ite
          ite=this.state.selectedItem;
          ite.cook=text;
          this.setState({selectedItem: ite});
          var itel;
          itel = this.state.items;
          itel[this.state.selectedIndex]=ite;
          this.setState({items:itel});
        AsyncStorage.multiSet([['recipeList', JSON.stringify(this.state.items)]]).then(()=>{
          this.setState({
            isSaving: false,
          });
          });
      }}
    />
    </View>
    <View style={ItemStyle}>
      <Text style={input_header_style}> Oven Setting </Text>
      <TextInput
        style={inputStyle}
        value={this.state.selectedItem.ovenSetting}
        onChangeText={text => {
          this.setState({isSaving:true});
        var ite
            ite=this.state.selectedItem;
            ite.oven=text;
            this.setState({selectedItem: ite});
            var itel;
            itel = this.state.items;
            itel[this.state.selectedIndex]=ite;
            this.setState({items:itel});
          AsyncStorage.multiSet([['recipeList', JSON.stringify(this.state.items)]]).then(()=>{
            this.setState({
              isSaving: false,
            });
            });
        }}
      />
    </View>
    <View style={ItemStyle}>
      <Text style={input_header_style}> Steps </Text>
      <TextInput
        style={inputStyle}
        value={this.state.selectedItem.steps}
        onChangeText={text => {
          this.setState({isSaving:true});
        var ite
            ite=this.state.selectedItem;
            ite.steps=text;
            this.setState({selectedItem: ite});
            var itel;
            itel = this.state.items;
            itel[this.state.selectedIndex]=ite;
            this.setState({items:itel});
          AsyncStorage.multiSet([['recipeList', JSON.stringify(this.state.items)]]).then(()=>{
            this.setState({
              isSaving: false,
            });
            });
        }}
        multiline={true}
        numberOfLines={5}
        blurOnSubmit={false}
      />
    </View>

    <View style={ItemStyle}>
      <Text style={input_header_style}> Ingrediants </Text>
      <TextInput
        style={inputStyle}
        value={this.state.selectedItem.ingrediants}
        onChangeText={text => {
          this.setState({isSaving:true});
        var ite;
            ite=this.state.selectedItem;
            ite.ingrediants=text;
            this.setState({selectedItem: ite});
            var itel;
            itel = this.state.items;
            itel[this.state.selectedIndex]=ite;
            this.setState({items:itel});
          AsyncStorage.multiSet([['recipeList', JSON.stringify(this.state.items)]]).then(()=>{
            this.setState({
              isSaving: false,
            });
            });
        }}
        multiline={true}
        numberOfLines={5}
        blurOnSubmit={false}
      />
    </View>
    </ScrollView>
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
