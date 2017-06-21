var math = require('mathjs');
var convert = require('convert-units')

export class Conversions{
	constructor() {
  }

  compare(amount1,amount2, price1,price2){
  	var val1 = parseInt(amount1);
  	var unit1 = amount1.replace(/[0-9]/g, '');
  	var val2 = parseInt(amount2);
  	var unit2 = amount2.replace(/[0-9]/g, '');
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

  unitConvert(amount, unit1, unit2){
    var result ="";
    try{
      result = convert(val1).from(unit1).to(unit2) +""+unit2;
    }catch(err){
      result = "Invalid Conversion"
    }
  	return result;
  }


};