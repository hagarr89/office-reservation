import { observer } from "mobx-react";
import { Dayjs } from "dayjs";

type resultsType = {
  [x: string]: string;
};
const AnalysisResults = ({
  date,
  results,
}: {
  date: Dayjs;
  results?: resultsType;
}) => {
  return (
    <div className="flex">
      <h2>Analysis Results</h2>
      <div>
        <div>{date.format("MM-YYYY")}</div>
      </div>
      <div>
        {Object.keys(results)?.map((key) => (
          <div>{results[key]}</div>
        ))}
      </div>
    </div>
  );
};

export default observer(AnalysisResults);
