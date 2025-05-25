import * as React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TableSortLabel,
} from '@mui/material';

interface RowData {
    [key: string]: string;
}

interface TableWithSubheaderProps {
    rows: RowData[];
    setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
    headers: string[];
}

const TableWithSubheader: React.FC<TableWithSubheaderProps> = ({ rows, setRows, headers }) => {
    console.log("ro", rows)
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<string>(headers[0]);

    const handleSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);

        const sortedRows = [...rows].sort((a, b) => {
            if (a[property] < b[property]) return isAsc ? -1 : 1;
            if (a[property] > b[property]) return isAsc ? 1 : -1;
            return 0;
        });
        setRows(sortedRows);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((col) => (
                                <TableCell key={col} align="left">
                                    <TableSortLabel
                                        active={orderBy === col}
                                        direction={orderBy === col ? order : 'asc'}
                                        onClick={() => handleSort(col)}
                                    >
                                        <Typography fontWeight="bold">{col}</Typography>
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell align="left">
                                    <Typography fontWeight="bold">{row["Customer"]}</Typography>
                                    <Typography color="textSecondary">{row.account}</Typography>
                                </TableCell>
                                <TableCell align="left" sx={{ color: 'green', fontWeight: 'bold' }}>
                                    {row["Due amount"]}
                                </TableCell>
                                <TableCell align="left" sx={{ color: 'gray' }}>
                                    {row["Due date"]}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TableWithSubheader;
