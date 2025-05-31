import StatusChip from '../../../../components/Chip/StatusChip';
import CustomDataGrid from '../../../../components/DataGrid2/CustomDataGrid';

const columns = [
    { field: 'receipt', headerName: 'Receipt #', width: 180 },
    {
        field: 'status',
        headerName: 'Status',
        width: 180,
        renderCell: (params: any) => {
            const statusColors: Record<string, string> = {
                'Paid': 'success',
                'Over due': 'error',
                'Disputed': 'error',
                'Current': 'info',
                'Promise to pay': 'success',
            };

            return (
                <StatusChip label={params.value} color={statusColors[params.value] || 'default'} />
            );
        },
    },
    { field: 'totalAmountPayable', headerName: 'Total amount payable', width: 180 },
    { field: 'transactionId', headerName: 'Transaction ID', width: 200 },
    { field: 'paymentAmount', headerName: 'Payment amount', width: 150 },
    { field: 'source', headerName: 'Source', width: 180 },
    { field: 'paymentDate', headerName: 'Payment date', width: 180 },
];

const rows = [
    {
        id: 1,
        receipt: '03142025',
        status: 'Paid',
        totalAmountPayable: '$19,524.00',
        transactionId: 'SVTX2503198928939904',
        paymentAmount: '$19,524.00',
        source: 'ERP load',
        paymentDate: 'Dec 31 2024',
    },
    {
        id: 2,
        receipt: '03152025',
        status: 'Over due',
        totalAmountPayable: '$13,890.00',
        transactionId: 'SVTX2503198928939904',
        paymentAmount: '$13,890.00',
        source: 'ERP load',
        paymentDate: 'Dec 31 2024',
    },
    {
        id: 3,
        receipt: '03442025',
        status: 'Disputed',
        totalAmountPayable: '$13,567.00',
        transactionId: 'SVTX2503198928939904',
        paymentAmount: '$13,567.00',
        source: 'ERP load',
        paymentDate: 'Dec 31 2024',
    },
    {
        id: 4,
        receipt: '031H2025',
        status: 'Current',
        totalAmountPayable: '$11,346.00',
        transactionId: 'SVTX2503198928939904',
        paymentAmount: '$11,346.00',
        source: 'ERP load',
        paymentDate: 'Dec 31 2024',
    },
    {
        id: 5,
        receipt: '031H2025',
        status: 'Promise to pay',
        totalAmountPayable: '$19,524.00',
        transactionId: 'SVTX2503198928939904',
        paymentAmount: '$19,524.00',
        source: 'ERP load',
        paymentDate: 'Dec 31 2024',
    },
    
];

const UnsettledPaymentsTable = () => {
    const handleExport = (type: any) => {
        if (type === 'excel') {
            console.log('Exporting as Excel...');
            // Implement Excel logic (e.g., SheetJS)
        } else if (type === 'pdf') {
            console.log('Exporting as PDF...');
            // Implement PDF logic (e.g., jsPDF)
        }
    };
    return (
        <CustomDataGrid
            columns={columns}
            rows={rows}
            handleExport={handleExport}
        />
    );
};

export default UnsettledPaymentsTable;