import React from "react";
import Papa from "papaparse";
import { IReservation } from "../store/reservationsStore";
//need to chnage T type
type Props<T> = {
  onChange(data: T[]): void;
};
const CSVSelector = <T extends { [x: string]: any }>({
  onChange,
}: Props<T>) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const file = e.target.files[0];
        if (file)
          Papa.parse<IReservation>(file, {
            header: true,
            transformHeader: (header) => {
              return header.replace(/\s+/g, "");
            },
            skipEmptyLines: true,
            complete({ data }: { [x: string]: any }) {
              onChange(data);
            },
          });
        else onChange([]);
        // 6. call the onChange event
      } catch (error) {
        console.error(error);
      }
    }
  };
  return <input type="file" accept=".csv" onChange={handleFileChange} />;
};

export default CSVSelector;
