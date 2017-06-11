import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image, Switch, ButtonGroup, FlatList, ScrollView} from 'react-native';
import { ButtonGroup as REButtonGroup } from 'react-native-elements';
import Calendar from 'react-native-calendar';
import ListItem from './ListItem'
const _=require('lodash');
export default class ExpireScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      switchValue: true,
      timeFrames:["This Week", "This Month", "All"],
      week:[{text:"1"}, {text:"2"}, {text:"3"}],
      month:[{text:"5"}, {text:"4"}],
      allList:[{text:"1"}, {text:"2"}, {text:"3"},{text:"4"},{text:"5"},{text:"6"}],
      listSource: [{text:"1"}, {text:"2"}, {text:"3"},{text:"4"},{text:"5"},{text:"6"}],
      selectedIndex:2,

    };
  }
  static navigationOptions = {
    title: 'Expire Dates',
  };  

  toggleCalendar(value){
    this.setState({switchValue: !this.state.switchValue });
  }

  selectTimeFrame(value){
    switch(value){
      case 0:
        this.setState({listSource: this.state.week });
      break;
      case 1:
        this.setState({listSource: this.state.month });
      break;
      case 2:
        this.setState({listSource: this.state.allList });
      break;
    }
    this.setState({selectedIndex: value });
  }

  removeItem(item){
    _.without(this.state.listSource, item)
  }

  addItemToCart(item){
    //Alert.alert("item added to cart",item.text);
  }




    render() {
      const { switchValue : showCalendar, timeFrames : buttons, selectedIndex : selectedIndex } = this.state; 
      return (
            <ScrollView>
            <View style={{flexDirection: 'row',justifyContent:'flex-end'}}>
            <Text style={{fontSize: 20}}>Show Calendar </Text>
            <Switch 
              onValueChange={()=>{
                this.toggleCalendar()
              }} 
              value={this.state.switchValue}
            />
            </View>

            { showCalendar ?  
              <Calendar
              ref="calendar"
              eventDates={['2017-05-03', '2017-05-05', '2017-05-28', '2017-05-30']}
              events={[{date: '2017-05-04', hasEventCircle: {backgroundColor: 'powderblue'}}]}
              scrollEnabled
              showControls
              /> : null
            }
            <REButtonGroup
              onPress={(val)=>this.selectTimeFrame(val)}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 50}}
              buttonStyle={{marginRight:10,marginLeft:10,borderRadius:10,borderWidth: 1,overflow: 'hidden', backgroundColor:'#7CBAB2'}}
              textStyle={{color:'black'}}
              selectedTextStyle={{fontWeight: 'bold',color:'black'}}
            />

            <FlatList
              data={this.state.listSource}
              renderItem={({item}) => <ListItem item={item} remove={item => this.removeItem(item)} addToCart={item=>this.addItemToCart(item)} />}
            />

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