import { makeAutoObservable } from "mobx";
import dayjs, { Dayjs } from "dayjs";
import {isCurrentDateInRange , calcDaysInMonth ,calcRevenuePerDay} from '../DateHelper'



export interface IReservation {
  EndDay: string;
  MonthlyPrice: string;
  StartDay: string;
  Capacity: string;
}

class ReservationsStore {
  csvData: IReservation[] | [] = [];
  filterDate: Dayjs = dayjs(new Date());

  constructor() {
    makeAutoObservable(this);
  }
  get unfilterRows(){
    const res = this.csvData.filter((row) =>
      !isCurrentDateInRange(row.StartDay, row.EndDay, this.filterDate)
    );
    return res;
  }
  get filterdRows() {
    const res = this.csvData.filter((row) =>
      isCurrentDateInRange(row.StartDay, row.EndDay, this.filterDate)
    );
    return res;
  }

  get revenue() {
    return this.filterdRows.reduce((acc, current) => {
     
      const res = (
      calcDaysInMonth(
          current.StartDay,
          current.EndDay,
          this.filterDate
        ) *
          calcRevenuePerDay(this.filterDate, current.MonthlyPrice) +
        acc
      );
      return  Math.round(res);
    }, 0);
  }

 get totalUnreservedCapacity() {
    return this.unfilterRows.reduce((acc , curent) =>{
       return Number(curent.Capacity )+ acc;
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
