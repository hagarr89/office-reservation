import { makeAutoObservable } from "mobx";
import dayjs, { Dayjs } from "dayjs";
import {isCurrentDateInRange , calcDaysInMonth ,calcRevenuePerDay} from '../DateHelper'



export interface IReservation {
  
  end_day: string;
  monthly_price: string;
  start_day: string;
  capacity: string;
}

class ReservationsStore {
  csvData: IReservation[] | [] = [];
  filterDate: Dayjs = dayjs(new Date());

  constructor() {
    makeAutoObservable(this);
  }
  get unfilterRows(){
    const res = this.csvData.filter((row) =>
      !isCurrentDateInRange(row.start_day, row.end_day, this.filterDate)
    );
    return res;
  }
  get filterdRows() {
    const res = this.csvData.filter((row) =>
      isCurrentDateInRange(row.start_day, row.end_day, this.filterDate)
    );

    return res;
  }

  get revenue() {
    return this.filterdRows.reduce((acc, current) => {
     
      const res = (
      calcDaysInMonth(
          current.start_day,
          current.end_day,
          this.filterDate
        ) *
          calcRevenuePerDay(this.filterDate, current.monthly_price) +
        acc
      );
      return  Math.round(res);
    }, 0);
  }

 get totalUnreservedCapacity() {
    return this.unfilterRows.reduce((acc , curent) =>{
       return Number(curent.capacity )+ acc;
    }, 0)
   
  }

  setDate(newDate: Dayjs) {
    this.filterDate = newDate;
  }
  setCSVData(data: IReservation[]) {
    this.csvData = data;
  }

}

const reservationsStore = new ReservationsStore();
export default reservationsStore;
