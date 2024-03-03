import { observer } from "mobx-react";
import { Dayjs } from "dayjs";

interface resultsType {
  [x: string]: string;
}
const AnalysisResults = ({
  date,
  results,
}: {
  date: Dayjs;
  results?: resultsType;
}) => {
  return (
    <div className="AnalysisResults">
      <h2>Analysis Results</h2>
      <div className="info">
        <div>{date.format("MM-YYYY")}</div>
        <div>
          {results
            ? Object.keys(results).map((key) => <div>{results[key]}</div>)
            : null}
        </div>
      </div>
    </div>
  );
};

export default observer(AnalysisResults);
