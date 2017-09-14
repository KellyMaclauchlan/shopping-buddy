import React,{ PropTypes} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableHighlight,
  Image,
  AsyncStorage
} from 'react-native';

import {
  Button as REButton,
  Text as REText,
  SideMenu,

} from 'react-native-elements';
var LayoutAnimation = require('react-native').LayoutAnimation;
var DEFAULT_ANIMATION = 'linear';
import MenuItem from './components/MenuItem';
import UnitPriceScreen from './components/UnitPriceScreen';
import GroceryScreen from './components/GroceryScreen';
import UnitConvertScreen from './components/UnitConvertScreen';
import ExpireScreen from './components/ExpireScreen';
import PantryScreen from './components/PantryScreen';
import RecipeScreen from './components/RecipeScreen';
//import ItemScreen from './components/ItemScreen';
import SettingsScreen from './components/SettingsScreen';

import { StackNavigator } from 'react-navigation';
const _ = require('lodash');
var shortid = require('shortid');


const unitCompare_img = require('./icons/unitcompare.png');
const grocery_img = require('./icons/grocerylist.png');
const expiery_img = require('./icons/expirydates.png');
const unitConvert_img = require('./icons/unitconvert.png');
const setting_img = require('./icons/setting.png');
const recipes_img = require('./icons/recipes.png');
const pantry_img = require('./icons/pantry.png');

window.kelly_uID = ()=> shortid.generate();
window.black = '#030312';
window.blue = "#7cbab2";
window.lightGrey = '#c5cbd3';
window.darkGrey = "#b0b7b6";
window.purple = '#310a31';
window.warmPurple = '#432043';

const sections = [
  {
    nav_name: 'UnitPrice',
    image: unitCompare_img,
    name: "Unit Price",
  },
  {
    nav_name: 'Grocery',
    image: grocery_img,
    name: "Grocery List",
  },
  {
    name: "Expiry date",
    image: expiery_img,
    nav_name:'Expire',
  },
  {
    name: "Unit Coversion",
    nav_name: 'UnitConvert',
    image:unitConvert_img,
  },
  {
    name: "Pantry List",
    nav_name: 'Pantry',
    image: pantry_img,
  },
  // {
  //   nav_name: "Recipe",
  //   image: recipes_img,
  //   name:'Recipe Planner',
  // },
  // {
  //   name: "Item View",
  //   nav_name: 'Item',
  //   image: note_img,
  // },
  {
    nav_name: "Settings",
    image: setting_img,
    name:'Settings',
  },
];



const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: window.blue,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: "column",
  },
  sideMenu:{
    flex: 1,
    backgroundColor: window.darkGrey,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: "column",
    paddingLeft: 50,
    borderRightWidth: 2,
  }
});



// const SideMenuContent = ({
// //   onSelectApp,
// //   sections,
// // }) => {
// //   return <View style={styles.sideMenu}>
// //     {_.map(sections, ({name, nav_name, image})=>
// //       <MenuItem
// //         key={name}
// //         onPress={()=> onSelectApp(nav_name)}
// //         image={image}
// //         text={name}
// //       />
// //     )}
// //   </View>
// };

const HomeScreen = ({
  sections,
  toggleSlider,
  onSelectApp,
}) => {
  const section_pairs = _.chunk(sections,2);
  return <View style={styles.container}>

    { _.map(section_pairs, (pair,ix) =>
      <View key={ix} style={styles.row}>
        {_.map(pair, ({name, nav_name, image })=>
          <MenuItem
            key={name}
            onPress={()=> onSelectApp(nav_name)}
            image={image}
            text={name}
          />
        )}
      </View>
    )}
  </View>;
}

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      menuExpanded: false,
      numberDone:0,
      isLoading:true,
      all_keys_are_there:["pantryList","groceryToPantry","pantrytoGrocery",
      "groceryList","pantryCategoryList","recipeList","defaultGroceryList"],
    };
    console.disableYellowBox = true;
  }

  componentWillMount(){

    AsyncStorage.getAllKeys().then(keys => {
      //console.log(keys);
      if(8=== keys.length){
        //console.log(keys);
        console.log("found the values")
          this.setState({isLoading:false});
      } else {
        console.log("setting values")
        AsyncStorage.multiSet([
          ['pantryList', JSON.stringify([])],
          ['groceryToPantry', JSON.stringify(true)],
          ['pantryToGrocery', JSON.stringify(true)],
          ['groceryList', JSON.stringify([])],
          ['pantryCategoryList', JSON.stringify([{text: "All", id : window.kelly_uID()},{text: "Fridge", id : window.kelly_uID()},{text: "Pantry", id : window.kelly_uID()}])],
          ['recipeList', JSON.stringify([])],
          ['defaultGroceryList', JSON.stringify([])]
        ]).then(()=>{
          this.setState({isLoading:false});
        });
      }

    })

  }
  
  static navigationOptions = {
    title: 'Welcome',
    headerTintColor: window.black,
    headerStyle:{ backgroundColor: window.lightGrey},
  };
 

//this is how alert works!
//Alert.alert(' recipe planner Button has been pressed!');
  toggleSideMenu(){
    this.setState({menuExpanded: !this.state.menuExpanded})
  }

  render() {
    const { navigate } = this.props.navigation;
    const { menuExpanded, isLoading } = this.state;
    const nav_to = app_name => navigate(app_name);

    if(isLoading){
      return <Text>"Loading..."</Text>
    }
    var keys;
    AsyncStorage.getAllKeys().then(keys => {
      console.log(keys)
      AsyncStorage.multiGet(keys).then( result => {

      });
    });


    return (
        <HomeScreen
          toggleSlider={()=>this.toggleSideMenu()}
          sections={sections}
          onSelectApp={nav_to}
        />      );
  }
}
App.propTypes = {
navigation: PropTypes.object.isRequired
}


const SimpleApp = StackNavigator({
  Home: { screen: App },
  UnitPrice: { screen: UnitPriceScreen },
  Grocery: { screen: GroceryScreen },
  Expire: { screen: ExpireScreen },
  Recipe: { screen: RecipeScreen },
  Pantry: { screen: PantryScreen },
  UnitConvert: { screen: UnitConvertScreen },
  Settings: { screen: SettingsScreen },

}, {
      headerMode: 'screen'
    });
AppRegistry.registerComponent('shopping-buddy', () => SimpleApp);
export default SimpleApp;
