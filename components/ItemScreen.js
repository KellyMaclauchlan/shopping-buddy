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
  KeyboardAvoidingView,
  ScrollView,
  LayoutAnimation,
  DeviceEventEmitter,
  Keyboard,
  Dimensions
} from 'react-native';
import {
  List as REList,
  ListItem as REListItem,
  Button as REButton,
  Text as REText,
  Icon,
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const _ = require('lodash');

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


export class ItemScreen extends React.Component {
  static navigationOptions = {
    title: 'Item',
  };
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      item:props["item"],
      visibleHeight:Dimensions.get('window').height,
     };
  }
  // componentDidMount() {
  //   //const { item} = this.props;
  //  // this.setState({ item:this.props[item] });
  // }
//   componentWillMount() {
//   DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
//   DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
// }

// keyboardWillShow(e) {
//   const visibleHeight = Dimensions.get('window').height - e.endCoordinates.height;
//   LayoutAnimation.configureNext(LayoutAnimation.create(
//     e.duration,
//     LayoutAnimation.Types[e.easing]
//   ));
//   this.setState({ visibleHeight });
// }
 componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => this._keyboardDidShow(e));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', e =>  this._keyboardDidHide(e) );
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow (e) {
  const visibleHeight = Dimensions.get('window').height - e.endCoordinates.height;
  LayoutAnimation.configureNext(LayoutAnimation.create(
    e.duration,
    LayoutAnimation.Types[e.easing]
  ));
  this.setState({ visibleHeight });
  }

  _keyboardDidHide (e) {
    const visibleHeight = Dimensions.get('window').height ;
    this.setState({ visibleHeight });
  }

  render() {
    //const { item } = this.state;
    const {onSave} = this.props;
    const item=this.state.item;
    const visibleHeight=this.state.visibleHeight;
    console.log(visibleHeight);
    var expire=item.expiryDate
    if(expire===undefined){
      expire=""
    }
    var notes=item.notes
    if(notes===undefined){
      notes=""
    }
    const pantryLocation= "Pantry Location:"
    console.log("here")
    return <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: window.darkGrey}}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
  
  <View >
    <REButton
      onPress= {()=> onSave(item)}
      buttonStyle={{backgroundColor: window.warmPurple, borderRadius: 10,overflow: 'hidden'}}
      textStyle={{textAlign: 'center'}}
      title={`Save`}
    />

  <Text style={input_header_style}> Name </Text>
    <TextInput
      style={inputStyle}
      value={this.state.item.text}
      onChangeText={text => {
      var ite
          ite=this.state.item;
          ite.name=text;
          this.setState({item: ite});

      }}
    />
    </View>
    {
      item.pantryLocation ?
      <View style={ItemStyle}>
        <Text style={input_header_style}> Pantry Location </Text>
        <TextInput
          style={inputStyle}
          value={this.state.item.pantryLocation+""}
          onChangeText={text => {
          var ite
              ite=this.state.item;
              ite.pantryLocation=text;
              this.setState({item: ite});
          }}
        />
      </View>:null
    }

    <View style={ItemStyle}>
      <Text style={input_header_style}> Quantity </Text>
      <TextInput
        style={inputStyle}
        value={this.state.item.quantity+""}
        onChangeText={text => {
        var ite
            ite=this.state.item;
            ite.quantity=text;
            this.setState({item: ite});
        }}
      />
    </View>
  <View style={ItemStyle}>
    <Text style={input_header_style}> Expire Date </Text>
    <DatePicker
        style={{width:320}}
        date={expire}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2017-05-01"
        maxDate="2022-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            backgroundColor:'#fefefe',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#999',
            borderWidth: 1,
            display: 'block',
            fontSize: 18,
            height:45,
            overflow: 'hidden',
            width:200
          }
          // ... You can check the source to find the other keys. 
        }}
        onDateChange={text => {
      var ite
          ite=this.state.item;
          ite.expiryDate=text;
          this.setState({item: ite});
      }}
      />
    </View>
    <View style={ItemStyle}>
      <Text style={input_header_style}> Notes </Text>
      <TextInput
        style={Object.assign({},inputStyle,{ height: 80})}
        value={notes}
        multiline={true}
        numberOfLines={5}
        blurOnSubmit={false}
        onChangeText={text => {
        var ite
            ite=this.state.item;
            ite.notes=text;
            this.setState({item: ite});

        }}
    />
    </View>
    </KeyboardAwareScrollView>
    
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
