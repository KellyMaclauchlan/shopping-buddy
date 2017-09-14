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
import { AddRemoveList } from './AddRemoveList';
import { ItemScreen } from './ItemScreen';
const colours = {blue :"#7cbab2",
    darkGrey : '#b0b7b6',
    black : '#030312',
    lightGrey : '#c5cbd3',
    purple : '#310a31',
    warmPurple : '#432043'}

export default class PantryScreen extends React.Component {
  static navigationOptions = {
    title: 'In your pantry',
    headerTintColor: window.black,
    headerStyle:{ backgroundColor: window.lightGrey},
  };
  constructor(props){
    super(props)

    this.state = {
      categories: [],
      items: [],
      inCategories: false,
      useList: [],
      currentCategory: null,
      toGrocery:false,
      groceryList:[],
      isSaving:false,
      isLoading:true,
      showItem:false,
      selectedItem:null,
      selectedIndex: null,
    };
  }

  componentWillMount(){
    AsyncStorage.multiGet(['groceryList', 'pantryToGrocery','pantryList','pantryCategoryList']).then(results => {
        const [[k1,grocery_json], [k2,pantry_json], [k3,pantryList_json], [k4, pantryCat_json]] = results;
        const list = JSON.parse(grocery_json);
        const pantry = JSON.parse(pantry_json);
        const pantryList = JSON.parse(pantryList_json);
        const pantryCat = JSON.parse(pantryCat_json);
        pantryList.map(item => console.log(item.text))
        this.setState({
          toGrocery: pantry,
          items: pantryList,
          isLoading: false,
          groceryList: list,
          categories:pantryCat,
          useList: pantryCat
        });

    });
  }

  goToCategory(category){
    if(category.text==="All"){
      this.setState({
          useList: this.state.items,
        })
    }

    var list = this.state.items.map(item => item.pantryLocation===category.text);
    currentCategory=category.text;
    this.setState({
          useList: list,
        })
  }
  onSave(item){
    var ites= this.state.items;
    ites[this.state.selectedIndex]=item;
    this.setState({
      isSaving: true,
    })
    AsyncStorage.multiSet([
          ['pantryList', JSON.stringify(ites)
        ]
      ]).then(()=>{
      this.setState({
        isSaving: false,
      });})
  }

  render() {
    const { items, inCategories, useList, showItem } = this.state;
    if(this.state.isLoading){
        return<View style={{alignItems:"center"}}><Image style={{width:320, height:520}}source={require('./../icons/load.gif')}/></View>;
      }
      if(this.state.isSaving){
        return<View style={{alignItems:"center"}}><Image source={require('./../icons/save.gif')}/></View>;
      }
      if(showItem){
        console.log("showing item")
        return <View style={{flex: 1, backgroundColor: window.darkGrey}}>
                <Button
                title = "Back"
                style={{justifyContent: 'flex-end', }}
                onPress= {()=> this.setState({showItem:false,})}
                /><ItemScreen onSave={(item)=>this.onSave(item)} item={this.state.selectedItem}/></View>;
      }
    return <View style={{flex: 1, backgroundColor: window.darkGrey}}>
    { inCategories ?
              <Button
              title = "Back"
              style={{justifyContent: 'flex-end', width: 50,}}
              onPress= {()=> this.setState({
                useList: this.state.categories,
                inCategories:false,
                })}
              /> : null
            }
            <AddRemoveList
      onAddItem={(new_item)=>{
        const { currentCategory } = this.state;
        console.log(this.state);
        this.setState({isSaving:true});
        if(inCategories){
          var cat = currentCategory==="All"? null: currentCategory;
          var item={
            text:new_item,
            expiryDate:null,
            defaultItem:false,
            pantryLocation:cat,
            quantity:1,
            notes:"",
            id: window.kelly_uID(),
          };
          var ites=this.state.items.concat([item]);
          var use=this.state.useList.concat([item]);
          this.setState({
            items: ites,
            useList: use,
            isSaving: true,
          },()=>{
            console.log(ites);
            AsyncStorage.multiSet([
              ['pantryList', JSON.stringify(ites)]
            ]).then(()=>{
              console.log("done")
              this.setState({

                isSaving: false,
              });
            });
          });
        } else {
          var ites=this.state.categories;
          this.setState({
            categories: ites.concat([{text: new_item, id : window.kelly_uID(), }]),
          },()=>{
            AsyncStorage.multiSet([
              ['pantryCategoryList', JSON.stringify(this.state.categories)]
            ]).then(()=>{
              this.setState({
                isSaving: false,
              });
            });
          });
        }
      }}
      onDismissItem={ ({id}) =>{
        if(inCategories){
        this.setState({isSaving:true});

        const { items, useList } = this.state;
        console.log(id)
        var item= _.find(items,{id})
        console.log(item)
        var ites= _.reject(items, { id })
        this.setState({
          items: ites,
          useList:_.reject(useList,{id})
        })
        let saveList=[
            ['pantryList', JSON.stringify(ites)]
          ];
        if(this.state.toGrocery){
          var gList=this.state.groceryList.concat([item]);
          this.setState({
          groceryList: gList,
          })
         saveList=[
            ['groceryList', JSON.stringify(gList)],
            ['pantryList', JSON.stringify(ites)]
          ];

        }
         AsyncStorage.multiSet(saveList).then(()=>{
            this.setState({
              isSaving: false,
            });
          });
        }else{
          const { categories, useList } = this.state;
          var cats = _.reject(categories, { id })
          this.setState({
            categories: cats,
            useList:_.reject(useList,{id})
          });
          AsyncStorage.multiSet([
            ['pantryCategoryList', JSON.stringify(cats)]
          ]).then(()=>{
            this.setState({
              isSaving: false,
            });
          });
        }
      }}
      onClickItem={ category =>{
        if(inCategories){
          const { items } = this.state;
          this.setState({
            selectedItem:category,
            selectedIndex: items.indexOf(category),
            showItem: true
          })
        }else{
        if(category.text==="All"){
          this.setState({
              useList: this.state.items,
              currentCategory: null,
              inCategories:true,
            })

        } else {
          var list = this.state.items.filter(item => item.pantryLocation===category.text);
          currentCategory=category.text;
          this.setState({
            useList: list,
            currentCategory: category.text,
            inCategories:true,
          })
        }
      }
      }}
      items={useList}
    />
    </View>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
