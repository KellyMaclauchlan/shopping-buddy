//import { Colours } from './colours';
//blue darkGrey black lightGrey purple warmPurple

const colours = {blue :"#7cbab2",
    darkGrey : '#b0b7b6',
    black : '#030312',
    lightGrey : '#c5cbd3',
    purple : '#310a31',
    warmPurple : '#432043'}

export function mainPageView(){
  	return { flex: 1,
    backgroundColor: colours.lightGrey,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: "column"};
  }
  //
  //https://reactnavigation.org/docs/intro/headers