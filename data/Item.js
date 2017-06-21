
export class Item{
	constructor() {
    this.name = "food";
    this.expiryDate = null;
    this.defaultItem = false;
    this.onGroceryList = false;
    this.inPantry = false;
    this.pantryLocation = ["All"];
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