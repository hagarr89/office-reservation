import React, { useState } from "react";
import Papa from "papaparse";
import { Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

type Props<T> = {
  onChange(data: T[]): void;
};
const CSVSelector = <T extends { [x: string]: any }>({
  onChange,
}: Props<T>) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const file = e.target.files[0];
        setFileName(file?.name);

        if (file)
          Papa.parse<T>(file, {
            worker: true,
            header: true,
            //transformHeader not work with worker
            // transformHeader: (header) => {
            //   return header.rreplace(/\s+/g, "_");
            // },
            skipEmptyLines: true,
            complete({ data }: { [x: string]: any }) {
              //transformHeader not work with worker
              const tranfrormKeys = data.map((obj) =>
                Object.keys(obj).reduce(
                  (acc, key) => ({
                    ...acc,
                    [key.trim().replace(/\s+/g, "_").toLowerCase()]: obj[key],
                  }),
                  {}
                )
              );

              onChange(tranfrormKeys);
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
      <label className="CSVSelector-fake" htmlFor="csv-button-file">
        <Button
          component="div"
          classes={{ root: "csv-button" }}
          variant="contained"
        >
          <UploadFileIcon />
          <div>Upload File</div>
        </Button>
        <div className="FileNme">{fileName}</div>
      </label>
    </div>
  );
};

export default CSVSelector;
