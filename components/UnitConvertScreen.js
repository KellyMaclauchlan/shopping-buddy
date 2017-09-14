import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image, TextInput } from 'react-native';
var convert = require('convert-units')
const itemStyle={
  marginVertical: 10,
  height: 60,
  borderColor: '#bbb',
  backgroundColor:'#fefefe',
  borderWidth: 1,
  justifyContent:'space-between',
};
const inputStyle={
  backgroundColor:'#fefefe',
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#999',
  borderWidth: 1,
  display: 'block',
  fontSize: 18,
  height:25,
  width:50,
  marginHorizontal: 5,
};
const textStyle={
  fontSize: 18,
};
const itemS={
  flexDirection:'column',
  marginVertical: 10,
   backgroundColor:"#7cbab2",
   width:130,
   borderRadius:10,
   borderWidth: 1,
   overflow: 'hidden'};
export default class UnitConvertScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      unit1:"",
      unit2:"",
      value:0,
      calculate:false,
      resultText:'',
    };
  }
  unitConvert(amount, unit1, unit2){
    var result ="";
    console.log(amount);
    console.log(unit1);
    console.log(unit2);
    try{
      console.log(convert(amount).from(unit1).to(unit2))
      result = convert(amount).from(unit1).to(unit2) +""+unit2;
    }catch(err){
      console.log(err)
      result = " an Invalid Conversion"
    }
    return result;
  }
  static navigationOptions = {
    title: 'Unit Price Calculator',
    headerTintColor: window.black,
    headerStyle:{ backgroundColor: window.lightGrey},
  };
  calculate(){
    var result = this.unitConvert(this.state.value, this.state.unit1.toLowerCase(), this.state.unit2.toLowerCase());
    this.setState({resultText:"It is:"+result});
    this.setState({calculate:true})
  };

    render() {
      return (
            <View style={{flex: 1, backgroundColor: window.darkGrey}}>
            <View style={{flexDirection:'row', marginHorizontal:20,justifyContent:'space-between',}}>
            <View style={itemS}>
                <View style={{flexDirection:'column'}}>
                  <Text style={textStyle}>Unit from:</Text>
                  <TextInput
                    style={inputStyle}
                    placeholder="g"
                    value={this.state.unit1}
                    onChangeText={text => {
                        this.setState({unit1: text});

                    }}
                  />
                </View>

                <View style={{flexDirection:'column'}}>
                  <Text style={textStyle}>Size:</Text>
                  <TextInput
                    style={inputStyle}
                    placeholder="1 "
                    value={this.state.value}
                    onChangeText={text => {
                        this.setState({value: text});
                    }}
                  />
                </View>
              </View>

              <View style={itemS}>
                <View style={{flexDirection:'column'}}>
                  <Text style={textStyle}>Convert To:</Text>
                  <TextInput
                    style={inputStyle}
                    placeholder="kg"
                    value={this.state.unit2}
                    onChangeText={text => {
                        this.setState({unit2: text});
                    }}
                  />
                </View>

              </View>
            </View>

            <TouchableHighlight onPress={()=>this.calculate()} >
              <View style={{alignItems:'center'}}>
              <Image style={styles.button} source={require("./../icons/converticon.png")}/>
              </View>
            </TouchableHighlight>

            {this.state.calculate ?
              <View style={{alignItems:'center'}}>
              <Text style={{fontSize: 25,paddingVertical:10}}>{this.state.resultText}</Text>
              </View>
              : null
            }
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
