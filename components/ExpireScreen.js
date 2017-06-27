import React from 'react';
import {AsyncStorage, StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image, Switch, ButtonGroup, FlatList, ScrollView} from 'react-native';
import { ButtonGroup as REButtonGroup } from 'react-native-elements';
import Calendar from 'react-native-calendar';
import ListItem from './ListItem'
const _=require('lodash');

function getExpiryList(wholeList){
  return wholeList.map(item => item.expiryDate!== null);
};

function getExpiryListWeek(expiryList){
  return expiryList.map(item => DateUtil.thisWeek(item.expiryDate));
}

function getExpiryListMonth(expiryList){
  return expiryList.map(item => DateUtil.thisMonth(item.expiryDate));
}

function beforeDate(date, cutoff){
    return date<cutoff;
  }

function  thisMonth(date){
    today = new Date();
    today.setDate(1);
    if(today.getMonth===11){
      today.setMonth(0);
      today.setFullYear(today.getFullYear()+1);
    }else{
      today.setMonth(today.getMonth() + 1);
    }
    return beforeDate(date,today);
  }
  
function  thisWeek(date){
    today = new Date();
    today.setDate(today.getDate() + 7);
    return beforeDate(date,today);
  }

export default class ExpireScreen extends React.Component {
  constructor(){
    super();
    var expiredList;

    this.state = {
      switchValue: true,
      timeFrames:["This Week", "This Month", "All"],
      week:[],
      month: [],
      allList: [],
      listSource: [],
      selectedIndex:2,
      groceryList:[],
      isLoading:true,
      isSaving:false,

    };
  }
  componentWillMount(){
    var list;
    AsyncStorage.multiGet(['pantryList','groceryList']).then(results => {
        const [[k1,pantry_json],[k2,grocery_json]] = results;
        const pantry = getExpiryList(JSON.parse(pantry_json));
        const grocery = JSON.parse(grocery_json);
        this.setState({
          week:getExpiryListWeek(pantry),
      month: getExpiryListMonth(pantry),
      allList: pantry,
      listSource: pantry,
          isLoading: false,
          groceryList: grocery
        })

    });
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
    this.setState({isSaving:true});
    const new_listSource = _.without(this.state.listSource, item);
    const new_allList = _.without(this.state.allList, item)
    AsyncStoragemultiSet([
      ['pantryList', JSON.stringify(new_allList)]
    ]).then(()=>{
      this.setState({
        isSaving: false,
        listSource: new_listSource,
        allList: new_allList,
      });
    });
  }

  addItemToCart(item){
    this.setState({isSaving:true});

    const new_listSource = _.without(this.state.listSource, item);
    const new_allList = _.without(this.state.allList, item)
    

    const new_groceryList = this.state.groceryList.concat([
      Object.assign({}, item, { expiryDate: false })
    ]); 

    AsyncStoragemultiSet([
      ['pantryList', JSON.stringify(new_allList)],
      ['groceryList', JSON.stringify(new_groceryList)]
    ]).then(()=>{
      this.setState({
        isSaving: false,
        listSource: new_listSource,
        allList: new_allList,
        groceryList: new_groceryList,
      });
    });

  }


    render() {
      const { switchValue : showCalendar, timeFrames : buttons, selectedIndex : selectedIndex } = this.state; 
      if(this.state.isSaving || this.state.isLoading){
        return <Text> Loading... </Text>;
      }
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