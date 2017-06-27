
export class Item{
	constructor() {
    name:"food", expiryDate:null, defaultItem:false, pantryLocation = null
  }
	constructor(name) {
    this.name = name;
    this.expiryDate = null;
    this.defaultItem = false;
    this.onGroceryList = false;
    this.inPantry = false;
    this.pantryLocation = ["All"];
  }
  addPantryLocation(location){
    this.pantryLocation.push(location)
  }


};