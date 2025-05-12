import * as React from 'react';
import {
    Box,
    Paper,
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
    customer: string;
    account: string;
    dueAmount: string;
    dueDate: string;
}

const TopCustomerTable: React.FC = () => {
    const headers = ['Customer', 'Due amount', 'Due date'];
    const [rows, setRows] = React.useState<RowData[]>([
        { customer: 'IronClad Fabrications 1', account: 'AC#34567', dueAmount: '$34,51,501', dueDate: 'Dec 31 2024' },
        { customer: 'IronClad Fabrications 2', account: 'AC#34567', dueAmount: '$34,51,501', dueDate: 'Dec 31 2024' },
        { customer: 'IronClad Fabrications 3', account: 'AC#34567', dueAmount: '$34,51,501', dueDate: 'Dec 31 2024' },
        { customer: 'IronClad Fabrications 4', account: 'AC#34567', dueAmount: '$45,501', dueDate: 'Dec 31 2024' },
    ]);
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('customer');

    const handleSort = (property: keyof RowData) => {
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
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">
                                    <TableSortLabel
                                        active={orderBy === 'customer'}
                                        direction={orderBy === 'customer' ? order : 'asc'}
                                        onClick={() => handleSort('customer')}
                                    >
                                        <Typography fontWeight="bold">Customer</Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="left">
                                    <TableSortLabel
                                        active={orderBy === 'dueAmount'}
                                        direction={orderBy === 'dueAmount' ? order : 'asc'}
                                        onClick={() => handleSort('dueAmount')}
                                    >
                                        <Typography fontWeight="bold">Due amount</Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="left">
                                    <TableSortLabel
                                        active={orderBy === 'dueDate'}
                                        direction={orderBy === 'dueDate' ? order : 'asc'}
                                        onClick={() => handleSort('dueDate')}
                                    >
                                        <Typography fontWeight="bold">Due date</Typography>
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    <TableCell align="left">
                                        <Typography fontWeight="bold">{row.customer}</Typography>
                                        <Typography color="textSecondary">{row.account}</Typography>
                                    </TableCell>
                                    <TableCell align="left" sx={{ color: 'green', fontWeight: 'bold' }}>
                                        {row.dueAmount}
                                    </TableCell>
                                    <TableCell align="left" sx={{ color: 'gray' }}>
                                        {row.dueDate}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default TopCustomerTable;
