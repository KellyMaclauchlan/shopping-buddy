
import Item from './item';
import DateUtil from './DateUtil';

export class MainSettings{
	constructor() {
    this.moveFromPantryToGrocery = false;
    this.moveFromGroceryToPantry = true;
  }

  removeItemFromPantry(item){
    if(this.moveFromPantryToGrocery){
      item.inPantry = false;
      item.inGrocery = true;
      return item;
    }
    return null;
  }

  removeItemFromGroceryList(item){
    if(this.moveFromGroceryToPantry){
      item.inPantry = true;
      item.inGrocery = false;
      return item;
    }
    return null;
  }

  getGroceryList(wholeList){
    return wholeList.map(item => item.inGrocery);
  }

  getPantryList(wholeList){
    return wholeList.map(item => item.inPantry);
  }

  getExpiryList(wholeList){
    return wholeList.map(item => item.expiryDate!== null);
  }

  getExpiryListWeek(expiryList){
    return wholeList.map(item => DateUtil.thisWeek(item.expiryDate));
  }

  getExpiryListMonth(expiryList){
    return wholeList.map(item => DateUtil.thisMonth(item.expiryDate));
  }




};