import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TablePagination,
} from "@mui/material";
import { useState } from "react";

const CSVReader = <T extends { [x: string]: any }>({
  data,
  isLoading,
}: {
  data: T[];
  isLoading: boolean;
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const headers = data?.length ? Object.keys(data[0]) : [];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!data.length) return <data>No Data was found</data>;
  return (
    <div>
      {!isLoading ? (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {headers?.map((header, i) => (
                    <th key={i}>{header.replace("_", " ")}</th>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      {headers?.map((col) => (
                        <TableCell align="center" key={col}>
                          {row[col as keyof T]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      ) : (
        <div>loading....</div>
      )}
    </div>
  );
};

export default CSVReader;
