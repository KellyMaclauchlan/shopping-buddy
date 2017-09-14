import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Button,
  Alert,
  TouchableHighlight,
  Image,
  TextInput,
  FlatList,
  AsyncStorage,
  View
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

export default class GroceryScreen extends React.Component {
  static navigationOptions = {
    title: 'Grocery List',
    headerTintColor: window.black,
    headerStyle:{ backgroundColor: window.lightGrey},
  };
  constructor(props){
    super(props)

    this.state = {
      items: [],
      toPantry:[],
      pantryList:[],
      isLoading:true,
      showItem:false,
    };
  }
  componentWillMount(){
    var list
    AsyncStorage.multiGet(['groceryList', 'groceryToPantry','pantryList', 'defaultGroceryList']).then(results => {
        const [[k1,grocery_json], [k2,pantry_json], [k3,pantryList_json], [k4,defaultGroceryList_json]] = results;
        const list = JSON.parse(grocery_json);
        const pantry = JSON.parse(pantry_json);
        const pantryList = JSON.parse(pantryList_json);
        const defaultList = JSON.parse(defaultGroceryList_json);


        this.setState({
          toPantry: pantry,
          items: list,
          isLoading: false,
          pantryList: pantryList,
          wholeList: defaultList.concat(list),
        })

    });
  }
  onSave(item){
    var ites= this.state.items;
    ites[this.state.selectedIndex]=item;
    isSaving=true;
    AsyncStorage.multiSet([
          ['groceryList', JSON.stringify(ites)
        ]
      ]).then(()=>{
      this.setState({
        isSaving: false,
      });})
  }

  render(){
    const { items, loading, showItem, wholeList } = this.state;
    if(this.state.isLoading){
        return<View style={{alignItems:"center"}}><Image style={{width:320, height:520}}source={require('./../icons/load.gif')}/></View>;
      }
      if(this.state.isSaving){
        return<View style={{alignItems:"center"}}><Image source={require('./../icons/save.gif')}/></View>;
      }

    if(showItem){
       return <View style={{flex: 1, backgroundColor: window.darkGrey}}>
                <Button
                title = "Back"
                onPress= {()=> this.setState({showItem:false,})}
                /><ItemScreen onSave={(item)=>this.onSave(item)} item={this.state.selectedItem}/></View>;
      
    }

    return <ScrollView style={{flex: 1, backgroundColor: window.darkGrey,}}>
    <AddRemoveList
      onAddItem={(new_item)=>{
        this.setState({isSaving:true});
        var item={
          text:new_item,
          expiryDate:null,
          defaultItem:false,
          pantryLocation:null,
          quantity:1,
          notes:"",
          id: window.kelly_uID(),
        }
        var ites=this.state.items.concat([item]);
        this.setState({
          items: ites,
        })
        console.log(ites);
        AsyncStorage.multiSet([
          ['groceryList', JSON.stringify(ites)
        ]
      ]).then(()=>{
      this.setState({
        isSaving: false,
      });
    });
      }}

      onDismissItem={ ({id}) =>{
        this.setState({isSaving:true});
        const { items, wholeList } = this.state;
        var item= _.find(items,{id})
        var ites = _.reject(items, { id })
        this.setState({
          items: ites,
          wholeList:_.reject(wholeList, { id }),
        })
        let saveList=[
            ['groceryList', JSON.stringify(ites)]
          ];
        if(this.state.toPantry){
          var pantry = this.state.pantryList.concat([item])
          this.setState({
          pantryList: pantry,
          })
         saveList=[
            ['pantryList', JSON.stringify(pantry)],
            ['groceryList', JSON.stringify(ites)]
          ];

        }
         AsyncStorage.multiSet(saveList).then(()=>{
            this.setState({
              isSaving: false,
            });
          });
      }}

      onClickItem={ (item) =>{
        const { items } = this.state;
        console.log(item.text)
        this.setState({
          selectedItem:item,
          selectedIndex: items.indexOf(item),
          showItem: true
        })

      }}

      items={this.state.items}
    /></ScrollView>
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
