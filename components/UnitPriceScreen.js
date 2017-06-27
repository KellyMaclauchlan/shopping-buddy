import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image, ScrollView, FlatList,TextInput } from 'react-native';
import UnitPriceItem from './UnitPriceItem'
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
  borderColor: '#bbb', 
  backgroundColor:'#fefefe',
  borderWidth: 1,
  width:50,
  justifyContent:'space-between',
};
const itemS={flexDirection:'column',marginVertical: 10, backgroundColor:'#c5cbd3',width:130, textAlign:'center',borderRadius:10,borderWidth: 1,overflow: 'hidden'};

export default class unitPriceScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      item1:{name:"Item 1:",price:0.00,size:1,unit:"g"},
      item2:{name:"Item 2:",price:1.00,size:1,unit:"g"},
      compared:false,
      resultText:'',
    };
  }
  static navigationOptions = {
    title: 'Unit Price Calculator',
  };
  compare(item1, item2){
    var val1 = item1.size;
    var unit1 = item1.unit
    var price1 = item1.price;
    var val2 = item2.size;
    var unit2 = item2.unit;
    var price2 = item2.price;
    var val1Convert;
    try{
     val1Convert = convert(val1).from(unit1).to(unit2);
    }catch(err){
      return "Units cannot be compaired"
    }

    var unitPrice1 = price1/val1Convert;
    var unitPrice2 = price2/val2;
    if(unitPrice1<unitPrice2){
      return "Item 1 has a better price"
    }else if(unitPrice2<unitPrice1){
      return "Item 2 has a better price"
    }else{
      return "They are the same price"
    }
  }
  convert(){
    var result = this.compare(this.state.item1, this.state.item2)
      this.setState({resultText:"Item 1 is a better price"});
    this.setState({compared:true})
  }

  //https://coolors.co/310a31-c5cbd3-000000-b0b7b6-7cbab2 colors for app 
    render() {
      return (
            <ScrollView>
            <View style={{flexDirection:'row', marginHorizontal:20,justifyContent:'space-between',}}>
            <View style={itemS}>
                <Text>item.name</Text>
                <View style={{flexDirection:'row'}}>
                  <Text>Price:</Text>
                  <TextInput 
                    style={inputStyle}
                    placeholder="0.00"
                    value={this.state.item1.price}
                    onChangeText={text => { 
                      var ite;
                        ite=this.state.item1;
                        ite.price=text;
                        this.setState({item1: ite});
                           
                    }}
                  />
                </View>

                <View style={{flexDirection:'row'}}>
                  <Text>Size:</Text>
                  <TextInput 
                    style={inputStyle}
                    placeholder="1"
                    value={this.state.item1.size}
                    onChangeText={text => { 
                    var ite;
                        ite=this.state.item1;
                        ite.size=text;
                        this.setState({item1: ite});
                       
                    }}
                  />
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text>Unit:</Text>
                  <TextInput 
                    style={inputStyle}
                    placeholder="g"
                    value={this.state.item1.unit}
                    onChangeText={text => { 
                    var ite;
                        ite=this.state.item1;
                        ite.unit=text;
                        this.setState({item1: ite});
                       
                    }}
                  />
                </View>
              </View>
              <View style={itemS}>
                <Text>item.name</Text>
                <View style={{flexDirection:'row'}}>
                  <Text>Price:</Text>
                  <TextInput 
                    style={inputStyle}
                    placeholder="0.00"
                    value={this.state.item2.price}
                    onChangeText={text => { 
                      var ite;
                        ite=this.state.item2;
                        ite.price=text;
                        this.setState({item2: ite});
                           
                    }}
                  />
                </View>

                <View style={{flexDirection:'row'}}>
                  <Text>Size:</Text>
                  <TextInput 
                    style={inputStyle}
                    placeholder="1"
                    value={this.state.item2.size}
                    onChangeText={text => { 
                    var ite
                        ite=this.state.item2;
                        ite.size=text;
                        this.setState({item2: ite});
                      
                    }}
                  />
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text>Unit:</Text>
                  <TextInput 
                    style={inputStyle}
                    placeholder="g"
                    value={this.state.item2.unit}
                    onChangeText={text => { 
                    var ite;
                        ite=this.state.item2;
                        ite.unit=text;
                        this.setState({item2: ite});
                       
                    }}
                  />
                </View>
              </View>
            </View>

            <TouchableHighlight onPress={()=>this.convert()} >
              <View style={{alignItems:'center'}}>
                <Image style={styles.button} source={require("./../icons/scale.png")}/>
                <Text>compare</Text>
              </View>
            </TouchableHighlight>

            {this.state.compared ?
              <View>
              <Text>{this.state.resultText}</Text>
              </View>
              : null
            }
            </ScrollView>
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