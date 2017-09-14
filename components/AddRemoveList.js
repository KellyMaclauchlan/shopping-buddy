import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Alert,
  TouchableHighlight,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import {
  List as REList,
  ListItem as REListItem,
  Button as REButton,
  Text as REText,
  Icon,
} from 'react-native-elements';
const _ = require('lodash');


const TodoRect = ({children}) => (
  <View style={ItemStyle}>
    {children}
  </View>
);
const colours = {blue :"#7cbab2",
    darkGrey : '#b0b7b6',
    black : '#030312',
    lightGrey : '#c5cbd3',
    purple : '#310a31',
    warmPurple : '#432043'}

const ItemStyle={
  marginVertical: 0,
  height: 60,
  paddingHorizontal: 20,
  paddingVertical: 10,
};

export class AddRemoveList extends React.Component {
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
        paddingVertical: 15,
      }}
    >
      <TextInput
        placeholder="Add an item"
        placeholderTextColor="#999"
        value={add_item_text}
        style={_.merge({
          borderColor: '#bbb',
          backgroundColor:'#fefefe',
          borderRadius:10,
          borderWidth: 1,
          overflow: 'hidden',
          paddingVertical: 15,
        },ItemStyle)}
        onChangeText={text => this.setState({add_item_text: text })}
        onKeyPress={(event)=> {
          if(event.nativeEvent.key == 'Enter' && !_.isEmpty(add_item_text) ){
            this.addItem(add_item_text);2
          }
        }}
        />
        <ScrollView>
        <FlatList
          data={items}
          renderItem={({item}) => (
            <TodoRect key={item.text}>
              <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{
                flexGrow:1,
                marginRight:20,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius:10,
                borderWidth: 1,
                overflow: 'hidden',
                backgroundColor: window.blue,
              }}>
              <Text
                  onPress={()=>onClickItem(item)}
                  children={item.text}
                  style={{fontSize: 18, color:'white', textAlign:'center'}}
                />
              </View>
                <View
                  style={{
                    backgroundColor: window.black,
                    borderRadius:40,
                    borderWidth: 1,
                    overflow: 'hidden',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    flexGrow: 0,

                  }}

                >
                  <Text
                    onPress={()=>onDismissItem(item)}
                    children={" X "}
                    style={{fontSize: 25,color:'white'}}
                  />
                </View>
              </View>
            </TodoRect>
          )}
        />
        </ScrollView>
    </View>);
  }
  addItem(item_text){
    this.props.onAddItem(item_text);
    this.setState({
      add_item_text: null,
    })
  }
}
