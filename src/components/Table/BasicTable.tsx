import * as React from 'react';
import {
  Box,
  Paper,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CustomToolbar from '../CustomToolbar/CustomToolbar';

interface BasicTableProps {
  title?: string;
  subtitle?: string;
  headers: string[];
  rows: Array<Array<string | number>>;
  linkColumnIndex?: number; // e.g., 1 to make "Invoice #" clickable
  onLinkClick?: (value: string | number, rowIndex: number) => void;
}

const BasicTable: React.FC<BasicTableProps> = ({
  title,
  subtitle,
  headers,
  rows,
  linkColumnIndex,
  onLinkClick,
}) => {
  const showToolbar = !!title || !!subtitle;

  const handleCellClick = (
    value: string | number,
    rowIndex: number,
    cellIndex: number
  ) => {
    if (linkColumnIndex === cellIndex && onLinkClick) {
      onLinkClick(value, rowIndex);
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <CustomToolbar title={title} subtitle={subtitle} rightContent={<IconButton size="small"><OpenInNewIcon fontSize="small" /></IconButton>}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableCell key={index} align="left">
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
              {paginatedRows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                      const isLink = linkColumnIndex === cellIndex;
                      return (
                        <TableCell
                          key={cellIndex}
                          align="left"
                          onClick={() =>
                            isLink && onLinkClick?.(cell, page * rowsPerPage + rowIndex)
                          }
                          sx={
                            isLink
                              ? {
                                  color: 'blue',
                                  textDecoration: 'underline',
                                  cursor: 'pointer',
                                }
                              : {}
                          }
                        >
                          {cell}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage=""
            sx={{
              '& .MuiSelect-select': {
                display: 'none !important',
              },
              '& > div.MuiToolbar-root > div.MuiInputBase-root > svg': {
                display: 'none !important',
              },
            }}
          />
        </CustomToolbar>

      </Paper>
    </Box>
  );
};

export default BasicTable;
