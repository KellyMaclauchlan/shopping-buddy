import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image } from 'react-native';
import MenuItem from './components/MenuItem';
import UnitPriceScreen from './components/UnitPriceScreen';
import GroceryScreen from './components/GroceryScreen';
import UnitConvertScreen from './components/UnitConvertScreen';
import ExpireScreen from './components/ExpireScreen';
import PantryScreen from './components/PantryScreen';
import RecipeScreen from './components/RecipeScreen';
import { StackNavigator } from 'react-navigation';

class App extends React.Component {
static navigationOptions = {
    title: 'Welcome',
  };
  
  groceryPress(){
    Alert.alert(' grocery list Button has been pressed!');
  };
  expireDatePress(){
    Alert.alert(' expire date Button has been pressed!');
  };
  unitConvertPress(){
    Alert.alert(' unit convert Button has been pressed!');
  };
  pantryListPress(){
    Alert.alert(' pantry list Button has been pressed!');
  };
  recipePlannerPress(){
    Alert.alert(' recipe planner Button has been pressed!');
  };


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <MenuItem onPress={() => navigate('UnitPrice')} image={require('./icons/scale.png')} text="Unit Price"/>
          <MenuItem onPress={() => navigate('Grocery')} image={require('./icons/cart.png')} text="Grocery List"/>
        </View>
        <View style={{flexDirection:'row'}}>
          <MenuItem onPress={() => navigate('Expire')} image={require('./icons/calendar.png')} text="Expirey Date"/>
          <MenuItem onPress={() => navigate('UnitConvert')} image={require('./icons/retweet.png')} text="Unit Converter"/>
        </View>
        <View style={{flexDirection:'row'}}>
          <MenuItem onPress={() => navigate('Pantry')} image={require('./icons/notes.png')} text="Pantry List"/>
          <MenuItem onPress={() => navigate('Recipe')} image={require('./icons/book.png')} text="Recipe Planner"/>
        </View>
      </View>
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
