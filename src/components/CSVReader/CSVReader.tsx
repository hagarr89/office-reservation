import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

const CSVReader = <T extends { [x: string]: any }>({ data }: { data: T[] }) => {
  const headers = data?.length ? Object.keys(data[0]) : [];
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers?.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              {headers?.map((col) => (
                <TableCell align="center">{row[col as keyof T]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CSVReader;
