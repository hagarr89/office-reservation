import React from "react";
import Papa from "papaparse";
import { Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

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
          Papa.parse<T>(file, {
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
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="CSVSelector">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        data-testid="csvFileInput"
        id="csv-button-file"
      />
      <label htmlFor="csv-button-file">
        <Button
          component="div"
          classes={{ root: "csv-button" }}
          variant="contained"
        >
          <UploadFileIcon />
          <div>Upload File</div>
        </Button>
      </label>
    </div>
  );
};

export default CSVSelector;
