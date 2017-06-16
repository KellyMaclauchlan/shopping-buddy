import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image, TextInput } from 'react-native';

const itemStyle={
  marginVertical: 10,
  height: 60, 
  borderColor: '#bbb', 
  backgroundColor:'#fefefe',
  borderWidth: 1,
  justifyContent:'space-between',
};
const inputStyle={
  borderColor: '#bbb', 
  backgroundColor:'#fefefe',
  borderWidth: 1,
  width:50,
  justifyContent:'space-between',
};
const itemS={flexDirection:'column',marginVertical: 10, backgroundColor:'#c5cbd3',width:130, textAlign:'center',borderRadius:10,borderWidth: 1,overflow: 'hidden'};

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
  static navigationOptions = {
    title: 'Unit Price Calculator',
  };
  calculate(){
    this.setState({resultText:"It is:"+this.state.value+" "+this.state.unit2});
    this.setState({calculate:true})
  };

    render() {
      return (
            <View>
            <View style={{flexDirection:'row', marginHorizontal:20,justifyContent:'space-between',}}>
            <View style={itemS}>
                <View style={{flexDirection:'row'}}>
                  <Text>Unit from:</Text>
                  <TextInput 
                    style={inputStyle}
                    placeholder="g"
                    value={this.state.unit1}
                    onChangeText={text => { 
                        this.setState({unit1: text});
                           
                    }}
                  />
                </View>

                <View style={{flexDirection:'row'}}>
                  <Text>Size:</Text>
                  <TextInput 
                    style={inputStyle}
                    placeholder="1"
                    value={this.state.value}
                    onChangeText={text => { 
                        this.setState({value: text});
                    }}
                  />
                </View>
              </View>

              <View style={itemS}>
                <Text>item.name</Text>
                <View style={{flexDirection:'row'}}>
                  <Text>Convert To:</Text>
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
                <Text>GO</Text>
              </View>
            </TouchableHighlight>

            {this.state.calculate ?
              <View style={itemS}>
                <View style={{flexDirection:'row'}}>
                  <Text>{this.state.resultText}</Text>
                </View>
              
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