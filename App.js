import React from 'react';
import { 
  AppRegistry, 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  Alert, 
  TouchableHighlight, 
  Image, 
} from 'react-native';

import { 
  Button as REButton,
  Text as REText,
  SideMenu,

} from 'react-native-elements';

import MenuItem from './components/MenuItem';
import UnitPriceScreen from './components/UnitPriceScreen';
import GroceryScreen from './components/GroceryScreen';
import UnitConvertScreen from './components/UnitConvertScreen';
import ExpireScreen from './components/ExpireScreen';
import PantryScreen from './components/PantryScreen';
import RecipeScreen from './components/RecipeScreen';
import { StackNavigator } from 'react-navigation';
const _ = require('lodash');



const scale_img = require('./icons/scale.png');
const cart_img = require('./icons/cart.png');
const calendar_img = require('./icons/calendar.png');
const retweet_img = require('./icons/retweet.png');
const note_img = require('./icons/notes.png');
const book_img = require('./icons/book.png');

 

const sections = [
  {
    nav_name: 'UnitPrice',
    image: scale_img,
    name: "Unit Price",
  },
  {
    nav_name: 'Grocery',
    image: cart_img,
    name: "Grocery List",
  },
  {
    name: "Expiry date",
    image: calendar_img,
    nav_name:'Expire',
  },
  {
    name: "Unit Coversion",
    nav_name: 'UnitConvert',
    image:retweet_img,
  },
  {
    name: "Pantry List",
    nav_name: 'Pantry',
    image: note_img,
  },
  {
    nav_name: "Recipe",
    image: book_img,
    name:'Recipe Planner',
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
    backgroundColor: '#f9f9f9',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: "column",
  },
  sideMenu:{
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: "column",
    paddingLeft: 50,
    borderRightWidth: 2,
  }
});



const SideMenuContent = ({
  onSelectApp,
  sections,
}) => {
  return <View style={styles.sideMenu}>
    {_.map(sections, ({name, nav_name, image})=>
      <MenuItem
        key={name}
        onPress={()=> onSelectApp(nav_name)}
        image={image}
        text={name}
      />
    )}
  </View>
};

const HomeScreen = ({
  sections,
  toggleSlider,
  onSelectApp,
}) => {
  const section_pairs = _.chunk(sections,2);
  return <View style={styles.container}>
    <REButton
      raised
      icon={{name: 'home', size: 32}}
      buttonStyle={{backgroundColor: 'red', borderRadius: 10,overflow: 'hidden'}}
      textStyle={{textAlign: 'center'}}
      title={`Welcome to\nReact Native Elements`} 
      onPress={toggleSlider}
    />
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
    };
  }
  static navigationOptions = {
    title: 'Welcome',
  };
  
//this is how alert works!  
//Alert.alert(' recipe planner Button has been pressed!');
  toggleSideMenu(){
    this.setState({menuExpanded: !this.state.menuExpanded})
  }

  render() {
    const { navigate } = this.props.navigation;
    const { menuExpanded } = this.state;
    const nav_to = app_name => navigate(app_name);

    return (
      <SideMenu
        onMove={()=> this.toggleSideMenu()}
        menu={
          <SideMenuContent 
            onSelectApp={nav_to}
            sections={sections}
          />
        }
        isOpen={menuExpanded}
      >
        <HomeScreen
          toggleSlider={()=>this.toggleSideMenu()}
          sections={sections}
          onSelectApp={nav_to}
        />
      </SideMenu>
      );
  }
}


const SimpleApp = StackNavigator({
  Home: { screen: App },
  UnitPrice: { screen: UnitPriceScreen }, 
  Grocery: { screen: GroceryScreen }, 
  Expire: { screen: ExpireScreen }, 
  Recipe: { screen: RecipeScreen }, 
  Pantry: { screen: PantryScreen }, 
  UnitConvert: { screen: UnitConvertScreen }, 
});
AppRegistry.registerComponent('shopping-buddy', () => SimpleApp);
export default SimpleApp;
