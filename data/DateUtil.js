export class DateUtil{
	constructor() {
  }


  beforeDate(date, cutoff){
  	return date<cutoff;
  }

  thisMonth(date){
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
  
  thisWeek(date){
    today = new Date();
    today.setDate(today.getDate() + 7);
    return beforeDate(date,today);
  }


};