import CSVSelector from "../components/CSVSelector";
import DatePickerInput from "../components/DatePickerInput";
import reservationsStore, { IReservation } from "../store/reservationsStore";
import CSVReader from "../components/CSVReader/CSVReader";
import AnalysisResults from "../components/AnalysisResults";
import { observer } from "mobx-react";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

const now = dayjs(new Date());

function currencyFormat(num: number) {
  return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const Reservations = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handelChangeCSV = (csvData: IReservation[]) => {
    reservationsStore.setCSVData(csvData);
  };
  const handelChangeDate = (value: Dayjs | null) => {
    try {
      setIsLoading(true);
      if (value) reservationsStore.setDate(value);
    } finally {
      setIsLoading(false);
    }
  };
  const analysisResults = {
    revenue: `expected revenue: ${currencyFormat(reservationsStore.revenue)}`,
    totalUnreservedCapacity: `expected total capacity of the unreserved offices: ${reservationsStore.totalUnreservedCapacity}`,
  };
  return (
    <div>
      <h1>Reservation Page</h1>
      <div className="header">
        <DatePickerInput
          onChangeDate={handelChangeDate}
          date={reservationsStore.filterDate}
          maxDate={now}
        />
        <CSVSelector<IReservation> onChange={handelChangeCSV} />
      </div>
      <AnalysisResults
        date={reservationsStore.filterDate}
        results={analysisResults}
      />
      <CSVReader<IReservation>
        data={reservationsStore.filterdRows}
        isLoading={isLoading}
      />
    </div>
  );
};

export default observer(Reservations);
