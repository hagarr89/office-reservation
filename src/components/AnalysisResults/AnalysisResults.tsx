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
        <div className="date">{date.format("MM-YYYY")}</div>
        <div className="content">
          {results
            ? Object.keys(results).map((key) => (
                <span key={key}>{results[key]}</span>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
