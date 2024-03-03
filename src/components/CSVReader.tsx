import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const CSVReader = <T extends { [x: string]: any }>({ data }: { data: T[] }) => {
  const headers = data?.length ? Object.keys(data[0]) : [];
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {headers?.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow>
              {headers?.map((col) => (
                <TableCell>{row[col as keyof T]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CSVReader;
