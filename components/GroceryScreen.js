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



export default class GroceryScreen extends React.Component {
  static navigationOptions = {
    title: 'Grocery List',
  };
  constructor(props){
    super(props)
    
    this.state = {
      items: [],
      toPantry:[],
      pantryList:[],
      isLoading:true,
    };
  }
  componentWillMount(){
    var list
    AsyncStorage.multiGet(['groceryList', 'groceryToPantry','pantryList']).then(results => {
        const [[k1,grocery_json], [k2,pantry_json], [k3,pantryList_json]] = results;
        const list = JSON.parse(grocery_json);
        const pantry = JSON.parse(pantry_json);
        const pantryList = JSON.parse(pantryList_json);

        this.setState({
          toPantry: pantry,
          items: list,
          isLoading: false,
          pantryList: pantryList
        })

    });
  }

  render() {
    const { items, loading } = this.state;

    if(loading){ return <Text> Loading... </Text>;  }


    return <AddRemoveList 
      onAddItem={(new_item)=>{
        this.setState({isSaving:true});
        var item={text:new_item, expiryDate:null, defaultItem:false, pantryLocation:null}
        var ites=this.state.items;
        this.setState({
          items: ites.concat([item]),
        })
        AsyncStoragemultiSet([
      ['groceryList', JSON.stringify(this.state.items)]
    ]).then(()=>{
      this.setState({
        isSaving: false,
      });
    });
      }}

      onDismissItem={ ({id}) =>{
        this.setState({isSaving:true});
        const { items } = this.state;
        this.setState({
          items: _.reject(items, { id }),
        })
        let saveList=[
            ['groceryList', JSON.stringify(this.state.items)]
          ];
        if(this.state.toPantry){
          this.setState({
          pantryList: this.state.pantryList.concat([item]),
          })
         saveList=[
            ['pantryList', JSON.stringify(this.state.pantryList)],
            ['groceryList', JSON.stringify(this.state.items)]
          ];

        }
         AsyncStoragemultiSet(saveList).then(()=>{
            this.setState({
              isSaving: false,
            });
          });
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


