import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    TableContainer,
    Paper,
} from '@mui/material';

const invoiceData = [
    {
        invoiceNumber: 'INV087282',
        invoiceDate: 'Dec 28 2024',
        dueDate: 'Dec 29 2024',
        daysLate: 1,
        amountPaid: '$7,000.00',
        invoiceBalance: '$7,000.00',
    },
];



const InvoiceReference = () => {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle1" sx={{ px: 2, pt: 2, fontWeight: 500 }}>
                Invoice reference
            </Typography>
            <Table size="small" sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Invoice #</TableCell>
                        <TableCell>Invoice date</TableCell>
                        <TableCell>Due date</TableCell>
                        <TableCell>Days late</TableCell>
                        <TableCell>Amount paid</TableCell>
                        <TableCell>Invoice balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoiceData.map((row, index) => (
                        <TableRow key={index} hover>
                            <TableCell sx={{ fontWeight: 600 }}>{row.invoiceNumber}</TableCell>
                            <TableCell>{row.invoiceDate}</TableCell>
                            <TableCell>{row.dueDate}</TableCell>
                            <TableCell>{row.daysLate}</TableCell>
                            <TableCell sx={{ color: 'green' }}>{row.amountPaid}</TableCell>
                            <TableCell>{row.invoiceBalance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default InvoiceReference