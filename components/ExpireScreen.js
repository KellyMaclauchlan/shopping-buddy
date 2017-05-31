import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image, Switch, ButtonGroup} from 'react-native';
import Calendar from 'react-native-calendar';
export default class ExpireScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      switchValue: true,
      timeFrames:["This Week", "This Month", "All"],
      week:["1", "2", "3"],
      month:["4", "5"],
      allList:["1", "2", "3","4","5","6"],
      listSource: ["1", "2", "3","4","5","6"],
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




    render() {
      const { switchValue : showCalendar, timeFrames : buttons, selectedIndex : selectedIndex } = this.state; 
      return (
            <View>
            <Switch 
              onValueChange={()=>{
                this.toggleCalendar()
              }} 
              value={this.state.switchValue}
            />

            { showCalendar ?  
              <Calendar
              ref="calendar"
              eventDates={['2017-05-03', '2017-05-05', '2017-05-28', '2017-05-30']}
              events={[{date: '2017-05-04', hasEventCircle: {backgroundColor: 'powderblue'}}]}
              scrollEnabled
              showControls
              /> : null
            }
            <ButtonGroup
              onPress={this.selectTimeFrame}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 100}}
              />

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