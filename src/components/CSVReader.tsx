import { IReservation } from "../store/reservationsStore";

const CSVReader = ({ data }: { data: IReservation[] }) => {
  const headers = data?.length ? Object.keys(data[0]) : [];

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers?.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr>
              {headers.map((col) => (
                <td>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVReader;
