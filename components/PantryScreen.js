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


class PresentationalPantryScreen extends React.Component {
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
      <REText h1> Pantry List </REText>
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


export default class PantryScreen extends React.Component {
  static navigationOptions = {
    title: 'In your pantry',
  };
  constructor(props){
    super(props)

    this.state = {
      categories: [],
      items: [],
      inCategories: true, 
      useList: [],
      currentCategory: null,
      toGrocery:false,
      groceryList:[],
      isSaving:false,
      isLoading:true,
    };
  }

  componentWillMount(){
    var list
    AsyncStorage.multiGet(['groceryList', 'pantryToGrocery','pantryList','pantryCategoryList']).then(results => {
        const [[k1,grocery_json], [k2,pantry_json], [k3,pantryList_json], [k4, pantryCat_json]] = results;
        const list = JSON.parse(grocery_json);
        const pantry = JSON.parse(pantry_json);
        const pantryList = JSON.parse(pantryList_json);
        const pantryCat = JSON.parse(pantryCat_json);

        this.setState({
          toGrocery: pantry,
          items: pantryList,
          isLoading: false,
          groceryList: list,
          categories:pantryCat,
        });

    });
  }

  goToCategory(category){
    var cat = category.text==="All"? null: category.text;
    var list = this.state.items.map(item => item.pantryLocation===category.text);
    currentCategory=category.text;
    this.setState({
          useList: list,
        })
  }

  render() {
    const { items, inCategories, useList } = this.state;
    { inCategories ?  
              <Button
              title = "Back"
              onPress= {()=> this.setState({
                useList: categories,
                inCategories:false,
                })}
              /> : null
            }
    return <PresentationalPantryScreen 
      onAddItem={(new_item)=>{
        this.setState({isSaving:true});
        if(inCategories){
          var cat = currentCategory.text==="All"? null: currentCategory.text;
          var item={text:new_item,expiryDate:null,defaultItem:false, pantryLocation:cat};
          var ites=this.state.items;
        this.setState({
          items: ites.concat([item]),
        })
        AsyncStoragemultiSet([
      ['pantryList', JSON.stringify(this.state.items)]
    ]).then(()=>{
      this.setState({
        isSaving: false,
      });
    });
      }else{
        var ites=this.state.categories;
        this.setState({
          categories: ites.concat([{text: new_item,}]),
        })
        AsyncStoragemultiSet([
              ['pantryCategoryList', JSON.stringify(this.state.categories)]
            ]).then(()=>{
              this.setState({
                isSaving: false,
              });
            });
      }
      }}
      onDismissItem={ ({id}) =>{
        if(inCategories){
        this.setState({isSaving:true});
        const { items } = this.state;
        this.setState({
          items: _.reject(items, { id }),
        })
        let saveList=[
            ['pantryList', JSON.stringify(this.state.items)]
          ];
        if(this.state.toPantry){
          this.setState({
          groceryList: this.state.groceryList.concat([item]),
          })
         saveList=[
            ['groceryList', JSON.stringify(this.state.groceryList)],
            ['pantryList', JSON.stringify(this.state.items)]
          ];

        }
         AsyncStoragemultiSet(saveList).then(()=>{
            this.setState({
              isSaving: false,
            });
          });
        }
        
      }}
      items={useList}
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