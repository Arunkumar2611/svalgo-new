import { Box, Button, Chip } from '@mui/material'
import CustomDataGrid from '../../../components/DataGrid2/CustomDataGrid'
import { useState } from 'react';
import CustomToggle from '../../../components/CustomToggle/CustomToggle';
import { Add } from '@mui/icons-material';
import CustomDrawer from '../../../components/CustomDrawer/CustomDrawer';
import AddPromiseToPayForm from './AddPromiseToPayForm';

const columnsFirst = [
    { field: 'ptpId', headerName: 'PTP ID', flex: 1 },
    { field: 'promiseAmount', headerName: 'Promise amount', flex: 1 },
    { field: 'startDate', headerName: 'Start date', flex: 1 },
    { field: 'paymentMethod', headerName: 'Payment method', flex: 1 },
    { field: 'paymentPlan', headerName: 'Payment plan', flex: 1 },
    { field: 'transactionStatus', headerName: 'Transaction status', flex: 1 },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        renderCell: (params) => {
            const status = params.value;
            const getChipColor = () => {
                switch (status) {
                    case 'Paid':
                        return { label: 'Paid', color: 'success' };
                    case 'Over due':
                        return { label: 'Over due', color: 'error' };
                    case 'Disputed':
                        return { label: 'Disputed', color: 'error' };
                    default:
                        return { label: status, color: 'default' };
                }
            };

            const { label, color } = getChipColor();
            return <Chip label={label} color={color} variant="outlined" />;
        },
    },
    { field: 'createdBy', headerName: 'Created by', flex: 1 },
];

const rowsFirst = [
    {
        id: 1,
        ptpId: 'SVPTP03142',
        promiseAmount: '$19,524.00',
        startDate: 'Dec 31 2024',
        paymentMethod: 'Visa',
        paymentPlan: 'Full payment',
        transactionStatus: 'Unbroken',
        status: 'Paid',
        createdBy: 'Ryan Cooper',
    },
    {
        id: 2,
        ptpId: 'SVPTP03142',
        promiseAmount: '$13,890.00',
        startDate: 'Dec 31 2024',
        paymentMethod: 'Visa',
        paymentPlan: 'Full payment',
        transactionStatus: 'Unbroken',
        status: 'Over due',
        createdBy: 'Ryan Cooper',
    },
    {
        id: 3,
        ptpId: 'SVPTP03142',
        promiseAmount: '$13,567.00',
        startDate: 'Dec 31 2024',
        paymentMethod: 'Visa',
        paymentPlan: 'Full payment',
        transactionStatus: 'Unbroken',
        status: 'Disputed',
        createdBy: 'Ryan Cooper',
    },
];

const columnsSecond = [
    { field: 'invoiceId', headerName: 'Invoice ID', flex: 1 },
    { field: 'amountDue', headerName: 'Amount Due', flex: 1 },
    { field: 'dueDate', headerName: 'Due Date', flex: 1 },
    { field: 'paymentMethod', headerName: 'Payment Method', flex: 1 },
    { field: 'billingCycle', headerName: 'Billing Cycle', flex: 1 },
    { field: 'invoiceStatus', headerName: 'Invoice Status', flex: 1 },
    {
        field: 'paymentState',
        headerName: 'Payment State',
        flex: 1,
        renderCell: (params) => {
            const value = params.value;
            const chipConfig = {
                Paid: { color: 'success' },
                Failed: { color: 'error' },
                Pending: { color: 'warning' },
            };
            return (
                <Chip
                    label={value}
                    color={chipConfig[value]?.color || 'default'}
                    variant="outlined"
                />
            );
        },
    },
    { field: 'billedTo', headerName: 'Billed To', flex: 1 },
];

const rowsSecond = [
    {
        id: 101,
        invoiceId: 'INV-99021',
        amountDue: '$8,760.00',
        dueDate: 'Jan 15 2025',
        paymentMethod: 'Mastercard',
        billingCycle: 'Quarterly',
        invoiceStatus: 'Generated',
        paymentState: 'Pending',
        billedTo: 'Emily Stone',
    },
    {
        id: 102,
        invoiceId: 'INV-99022',
        amountDue: '$12,450.00',
        dueDate: 'Feb 01 2025',
        paymentMethod: 'PayPal',
        billingCycle: 'Monthly',
        invoiceStatus: 'Generated',
        paymentState: 'Failed',
        billedTo: 'John Miles',
    },
    {
        id: 103,
        invoiceId: 'INV-99023',
        amountDue: '$5,320.00',
        dueDate: 'Jan 25 2025',
        paymentMethod: 'Bank Transfer',
        billingCycle: 'Yearly',
        invoiceStatus: 'Paid',
        paymentState: 'Paid',
        billedTo: 'Diana Prince',
    },
];

const PromiseToPay = () => {
    const [selectedTab, setSelectedTab] = useState('openPtp');
    const [addDrawerOpen, setAddDrawerOpen] = useState(false);
    const [newPtp, setPtp] = useState({});

    const toggleOptions = [
        { value: 'openPtp', label: 'Open Ptp' },
        { value: 'processedPtp', label: 'Processed Ptp' },
    ];

    const handleExport = (type: any) => {
        if (type === 'excel') {
            console.log('Exporting as Excel...');
            // Implement Excel logic (e.g., SheetJS)
        } else if (type === 'pdf') {
            console.log('Exporting as PDF...');
            // Implement PDF logic (e.g., jsPDF)
        }
    };

    const columns = selectedTab === 'openPtp' ? columnsFirst : columnsSecond;
    const rows = selectedTab === 'openPtp' ? rowsFirst : rowsSecond;

    const onAddClick = () => {
        setPtp({});
        setAddDrawerOpen(true);
    }

    const handleAddSubmit = () => {

    }

    return (
        <Box
            sx={{
                border: '1px solid #E0E0E0',
                borderRadius: '10px',
                p: 2,
                bgcolor: '#fff',
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            <CustomDataGrid
                columns={columns}
                rows={rows.map((row, index) => ({ ...row, id: row.id || index }))} // Ensure each row has a unique id

                handleExport={handleExport}
                headerChildren={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                        <CustomToggle
                            options={toggleOptions}
                            selected={selectedTab}
                            setSelected={setSelectedTab}
                        />
                        <Button
                            startIcon={<Add />}
                            variant="contained"
                            onClick={onAddClick}
                            sx={{
                                background: '#7F56D9',
                                color: '#fff',
                                borderRadius: 1.5,
                                textTransform: 'none',
                            }}
                        >
                            Add Ptp
                        </Button>
                    </Box>
                }
            />
            <CustomDrawer
                    open={addDrawerOpen}
                    onClose={() => setAddDrawerOpen(false)}
                    title="Add New Contact"
                    onSubmit={handleAddSubmit}
                  >
                    <AddPromiseToPayForm />
                  </CustomDrawer>
        </Box>
    )
}

export default PromiseToPay