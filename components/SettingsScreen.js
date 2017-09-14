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
const colours = {blue :"#7cbab2",
    darkGrey : '#b0b7b6',
    black : '#030312',
    lightGrey : '#c5cbd3',
    purple : '#310a31',
    warmPurple : '#432043'}


import { AddRemoveList } from './AddRemoveList';
const inputStyle={
  borderColor: '#bbb',
  backgroundColor:'#fefefe',
  borderWidth: 1,
  width:50,
  justifyContent:'space-between',
};


export default class SettingsScreen extends React.Component {
  constructor(){
    super();

    this.state = {
      switchValue: true,
      items:[],
      items2: [],
      toGrocery:false,
      toPantry:false,
      isLoading:true,
      isSaving:false,
    };
  }
  static navigationOptions = {
    title: 'Settings',
    headerTintColor: window.black,
    headerStyle:{ backgroundColor: window.lightGrey},
  };

  componentWillMount(){
    AsyncStorage.multiGet(['groceryToPantry', 'pantryToGrocery','defaultGroceryList','pantryCategoryList']).then(results => {
        const [[k1,grocery_json], [k2,pantry_json], [k3,groceryList_json], [k4, pantryCat_json]] = results;
        const pantry = JSON.parse(grocery_json);
        const grocery = JSON.parse(pantry_json);
        const groceryList = JSON.parse(groceryList_json);
        const pantryCat = JSON.parse(pantryCat_json);

        this.setState({
          items2:pantryCat,
          items: groceryList,
          toGrocery:grocery,
          toPantry:pantry,
          isLoading: false,

        });

    });
  }

  togglePantry(value){
    var bool = !this.state.toPantry;
    this.setState({toPantry: bool });
    this.setState({isSaving:true});
    AsyncStorage.multiSet([['groceryToPantry', JSON.stringify(bool)]]).then(()=>{
          this.setState({
            isSaving: false,
          });});
  }
  toggleGrocery(value){
    var bool = !this.state.toGrocery
    this.setState({toGrocery: bool });
    this.setState({isSaving:true});
    AsyncStorage.multiSet([['pantryToGrocery', JSON.stringify(bool)]]).then(()=>{
          this.setState({
            isSaving: false,
          });
          });
  }
  deleteGrocery(){
    this.setState({isSaving:true});
    AsyncStorage.multiSet([['groceryList', JSON.stringify([])]]).then(()=>{
          this.setState({
            isSaving: false,
          });
          });
  }
  deletePantry(){
    this.setState({isSaving:true});
    AsyncStorage.multiSet([['pantryList', JSON.stringify([])]]).then(()=>{
          this.setState({
            isSaving: false,
          });
          });
  }


    render() {
      const { toGrocery, toPantry, timeFrames : buttons, selectedIndex : selectedIndex, items, items2 } = this.state;
      if(this.state.isLoading){
        return<View style={{alignItems:"center"}}><Image style={{width:320, height:520}}source={require('./../icons/load.gif')}/></View>;
      }
      if(this.state.isSaving){
        return<View style={{alignItems:"center"}}><Image source={require('./../icons/save.gif')}/></View>;
      }

      return (
            <ScrollView style={{backgroundColor: window.darkGrey}}>
            <Text style={{fontSize: 20}}>Groceries:</Text>
            <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 15 }}>Add removed items to pantry: </Text>
            <Switch
              onValueChange={()=>{
                this.togglePantry()
              }}
              value={toPantry}
              onTintColor={window.purple}
            />
            </View>
            <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize: 17}}>Defalut grocery List </Text>
            </View>
            <AddRemoveList
              onAddItem={(new_item)=>{
                ites = items.concat([{text: new_item, id: window.kelly_uID()}])
                this.setState({
                  items: ites,
                })
                this.setState({isSaving:true});
                AsyncStorage.multiSet([['defaultGroceryList', JSON.stringify(ites)]]).then(()=>{
          this.setState({
            isSaving: false,
          });
          });
              }}
              onDismissItem={ ({id}) =>{
                const { items } = this.state;
                ites = _.reject(items, { id })
                this.setState({
                  items: ites,
                })
                this.setState({isSaving:true});
    AsyncStorage.multiSet([['defaultGroceryList', JSON.stringify(ites)]]).then(()=>{
          this.setState({
            isSaving: false,
          });});
              }}
              onClickItem={ ({id}) =>{}}
              items={items}
            />
            <Text style={{fontSize: 20}}>Pantry:</Text>
            <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{fontSize: 15}}> Add removed items to grocery list </Text>
            <Switch
              onValueChange={()=>{
                this.toggleGrocery()
              }}
              value={toGrocery}
              onTintColor={window.purple}
            />

            </View>
<AddRemoveList
      onAddItem={(new_item)=>{
        ites=this.state.items2.concat([{text: new_item, id: window.kelly_uID()}])
        this.setState({
          items2: ites,
        })
        this.setState({isSaving:true});
    AsyncStorage.multiSet([['pantryCategoryList', JSON.stringify(ites)]]).then(()=>{
          this.setState({
            isSaving: false,
          });});
      }}
      onDismissItem={ ({id}) =>{
        const { items2 } = this.state;
        ites = _.reject(items2, { id })
        this.setState({
          items2: ites,
        })
        this.setState({isSaving:true});
    AsyncStorage.multiSet([['pantryCategoryList', JSON.stringify(ites)]]).then(()=>{
          this.setState({
            isSaving: false,
          });});
      }}
      onClickItem={ ({id}) =>{}}
      items={items2}

    />
    <REButton
      onPress= {()=> this.deleteGrocery()}
      buttonStyle={{backgroundColor: window.warmPurple, borderRadius: 10,overflow: 'hidden'}}
      textStyle={{textAlign: 'center'}}
      title={`Delete grocery list`}
    />
    <REButton
      onPress= {()=> this.deletePantry()}
      buttonStyle={{backgroundColor: window.warmPurple, borderRadius: 10,overflow: 'hidden'}}
      textStyle={{textAlign: 'center'}}
      title={`Delete pantry list`}
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
