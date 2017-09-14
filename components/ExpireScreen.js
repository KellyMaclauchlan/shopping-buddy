import React from 'react';
import {AsyncStorage, StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image, Switch, ButtonGroup, FlatList, ScrollView} from 'react-native';
import { ButtonGroup as REButtonGroup } from 'react-native-elements';
import Calendar from 'react-native-calendar';
import ListItem from './ListItem'
import { ItemScreen } from './ItemScreen';
const _=require('lodash');

function getExpiryList(wholeList){
  return _.filter(wholeList, item => item.expiryDate!== null );
};

function getExpiryListWeek(expiryList){
  return _.filter(expiryList,item => thisWeek(new Date(item.expiryDate)) ===true);
}

function getExpiryListMonth(expiryList){
  return _.filter(expiryList,item => thisMonth(new Date(item.expiryDate)) === true);
}

function beforeDate(date, cutoff){
    return date<cutoff;
  }

function  thisMonth(date){
    cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + 31);
    var result= beforeDate(date.getTime(),cutoff.getTime());
    return result;
  }
  
function  thisWeek(date){
    cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + 7);
    var result= beforeDate(date.getTime(),cutoff.getTime());
    return result;
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
      pantryList:[],
      showItem:false,
      dates:[],

    };
  }
  componentWillMount(){
    var list;
    AsyncStorage.multiGet(['pantryList','groceryList']).then(results => {
        const [[k1,pantry_json],[k2,grocery_json]] = results;
        const pantry = getExpiryList(JSON.parse(pantry_json));
        const pantryL = JSON.parse(pantry_json);
        const grocery = JSON.parse(grocery_json);
        console.log(pantry);
        var thisWeek = getExpiryListWeek(pantry);
        var thisMonth = getExpiryListMonth(pantry);
        console.log(thisWeek);
        console.log(thisMonth);
        var thisDates = _.map(pantry, 'expiryDate')
        console.log(thisDates);
        this.setState({
          week:thisWeek,
          month: thisMonth,
          allList: pantry,
          listSource: pantry,
          isLoading: false,
          groceryList: grocery,
          pantryList :pantryL,
          dates :thisDates,
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
    AsyncStorage.multiSet([
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

    AsyncStorage.multiSet([
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
  onSave(item){
    var ites= this.state.pantryList;
    ites[this.state.selectedIndex]=item;
    isSaving=true;
    AsyncStorage.multiSet([
          ['pantryList', JSON.stringify(ites)
        ]
      ]).then(()=>{
      this.setState({
        isSaving: false,
      });})
  }
  onClickItem(item){
        const { pantryList } = this.state;
        console.log(item.text)
        this.setState({
          selectedItem:item,
          selectedIndex: pantryList.indexOf(item),
           showItem: true
        })
  }
  _keyExtractor = (item, index) => item.id;

    render() {
      const { switchValue : showCalendar, timeFrames : buttons, selectedIndex : selectedIndex , showItem, dates } = this.state; 
      if(this.state.isLoading){
        return<View style={{alignItems:"center"}}><Image style={{width:320, height:520}}source={require('./../icons/load.gif')}/></View>;
      }
      if(this.state.isSaving){
        return<View style={{alignItems:"center"}}><Image source={require('./../icons/save.gif')}/></View>;
      }
      console.log(dates)
      if(showItem){
      return <View style={{flex: 1, backgroundColor: window.darkGrey}}>
                <Button
                title = "Back"
                style={{justifyContent: 'flex-end', }}
                onPress= {()=> this.setState({showItem:false,})}
                /><ItemScreen onSave={(item)=>this.onSave(item)} item={this.state.selectedItem}/></View>;
    }

      return (
            <ScrollView style={{backgroundColor: window.darkGrey}}>
            <View style={{flexDirection: 'row',justifyContent:'flex-end'}}>
            <Text style={{fontSize: 20}}>Show Calendar </Text>
            <Switch 
              onValueChange={()=>{
                this.toggleCalendar()
              }} 
              value={this.state.switchValue}
              onTintColor={window.purple}
            />
            </View>

            { showCalendar ?  
              <Calendar
              ref="calendar"
              eventDates={dates}
              weekStart={0}
              customStyle={{
              hasEventCircle: {backgroundColor: 'powderblue'} ,
              weekendDayText: {color: 'black',},
              currentDayText: {color: 'grey',},
              }}
              scrollEnabled={true}
              showControls={true}
              showEventIndicators={true}
              /> : null
            }
            <REButtonGroup
              onPress={(val)=>this.selectTimeFrame(val)}
              selectedIndex={selectedIndex}
              buttons={buttons}
              selectedBackgroundColor={window.darkGrey}
              innerBorderStyle={{color: window.darkGrey}}
              containerStyle={{height: 50 , backgroundColor:window.darkGrey, borderColor:window.darkGrey}}
              buttonStyle={{marginRight:10,marginLeft:10,borderRadius:10,borderWidth: 1,overflow: 'hidden', backgroundColor:window.blue}}
              textStyle={{color:'black'}}
              selectedTextStyle={{fontWeight: 'bold',color:'black'}}
            />

            <FlatList
              data={this.state.listSource}
              keyExtractor={this._keyExtractor}
              renderItem={ ({item}) => 
                <ListItem 
                  item={item} 
                  seeItem={item=>this.onClickItem(item)} 
                  remove={item => this.removeItem(item)} 
                  addToCart={item=>this.addItemToCart(item)} 
                />
              }
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