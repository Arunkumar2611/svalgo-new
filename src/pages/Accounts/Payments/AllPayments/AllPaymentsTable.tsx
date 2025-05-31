import StatusChip from '../../../../components/Chip/StatusChip';
import CustomDataGrid from '../../../../components/DataGrid2/CustomDataGrid';

const columns = [
    { field: 'receipt', headerName: 'Receipt #', width: 180, flex: 1, },
    {
        field: 'status',
        headerName: 'Status',
        width: 180,
        flex: 1,
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
    { field: 'totalAmountPayable', headerName: 'Total amount payable', width: 180, flex: 1, },
    { field: 'transactionId', headerName: 'Transaction ID', width: 200, flex: 1, },
    { field: 'paymentAmount', headerName: 'Payment amount', width: 150, flex: 1, },
    { field: 'source', headerName: 'Source', width: 180, flex: 1, },
    { field: 'paymentDate', headerName: 'Payment date', width: 180, flex: 1, },
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
    {
        id: 6,
        receipt: '031H2025',
        status: 'Over due',
        totalAmountPayable: '$19,524.00',
        transactionId: 'SVTX2503198928939904',
        paymentAmount: '$19,524.00',
        source: 'ERP load',
        paymentDate: 'Dec 31 2024',
    },
    {
        id: 7,
        receipt: 'INV087282',
        status: 'Paid',
        totalAmountPayable: '$19,524.00',
        transactionId: 'SVTX2503198928939904',
        paymentAmount: '$19,524.00',
        source: 'ERP load',
        paymentDate: 'Dec 31 2024',
    },
    {
        id: 8,
        receipt: '03442025',
        status: 'Current',
        totalAmountPayable: '$13,567.00',
        transactionId: 'SVTX2503198928939904',
        paymentAmount: '$13,567.00',
        source: 'ERP load',
        paymentDate: 'Dec 31 2024',
    },
    {
        id: 9,
        receipt: 'INV123456',
        status: 'Paid',
        totalAmountPayable: '$15,000.00',
        transactionId: 'SVTX2503198928939905',
        paymentAmount: '$15,000.00',
        source: 'ERP load',
        paymentDate: 'Jan 01 2025',
    },
    {
        id: 10,
        receipt: 'INV123457',
        status: 'Over due',
        totalAmountPayable: '$20,000.00',
        transactionId: 'SVTX2503198928939906',
        paymentAmount: '$20,000.00',
        source: 'ERP load',
        paymentDate: 'Jan 02 2025',
    },
    {
        id: 11,
        receipt: 'INV123458',
        status: 'Disputed',
        totalAmountPayable: '$25,000.00',
        transactionId: 'SVTX2503198928939907',
        paymentAmount: '$25,000.00',
        source: 'ERP load',
        paymentDate: 'Jan 03 2025',
    },
    {
        id: 12,
        receipt: 'INV123459',
        status: 'Current',
        totalAmountPayable: '$30,000.00',
        transactionId: 'SVTX2503198928939908',
        paymentAmount: '$30,000.00',
        source: 'ERP load',
        paymentDate: 'Jan 04 2025',
    },
    {
        id: 13,
        receipt: 'INV123460',
        status: 'Promise to pay',
        totalAmountPayable: '$35,000.00',
        transactionId: 'SVTX2503198928939909',
        paymentAmount: '$35,000.00',
        source: 'ERP load',
        paymentDate: 'Jan 05 2025',
    },
    ...Array.from({ length: 87 }, (_, index) => ({
        id: index + 14,
        receipt: `INV1234${index + 61}`,
        status: ['Paid', 'Over due', 'Disputed', 'Current', 'Promise to pay'][index % 5],
        totalAmountPayable: `$${(index + 1) * 1000}.00`,
        transactionId: `SVTX25031989299${index + 10}`,
        paymentAmount: `$${(index + 1) * 1000}.00`,
        source: 'ERP load',
        paymentDate: `Jan ${index % 31 + 1} 2025`,
    })),
];

const AllPaymentsTable = () => {
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

export default AllPaymentsTable;