import * as React from 'react';
import {
    DataGrid,
    GridColDef, GridDensity,
} from '@mui/x-data-grid';
import CustomGridToolbar from './CustomGridToolbar'; // Import the missing component

// Removed unused RowType interface
import { CustomGridPagination } from './CustomGridPagination';

interface CustomDataGridProps {
    columns: GridColDef[]; // Use the specific type from @mui/x-data-grid
    rows: Array<{ id: number; [key: string]: string | number | boolean | null }>; // Replace with the specific row type
    loading: boolean;
    handleExport: (type: string) => void;
    [key: string]: unknown; // For additional props
}

export default function CustomDataGrid({ columns, rows, loading, handleExport, toolbarTitle, headerChildren }: CustomDataGridProps) {
    const [density, setDensity] = React.useState<GridDensity>('standard');
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });

    // const handleExport = (type) => {
    //     if (type === 'excel') {
    //         console.log('Exporting as Excel...');
    //         // Implement Excel logic (e.g., SheetJS)
    //     } else if (type === 'pdf') {
    //         console.log('Exporting as PDF...');
    //         // Implement PDF logic (e.g., jsPDF)
    //     }
    // };



    return (
        <div style={{ height: "auto", width: '100%' }}>
            <DataGrid
                sx={{

                    '& .MuiDataGrid-cell': {
                        px: 3, // Padding left & right for each data cell
                    },
                    '& .MuiDataGrid-columnHeader': {
                        px: 3, // Padding left & right for each header cell
                    },
                    '& .MuiDataGrid-toolbarContainer': {
                        px: 3, // Padding left & right for toolbar
                        mt: 3,
                        mb: 3,
                    },
                }}
                columns={columns}
                rows={rows}
                loading={loading}
                showToolbar
                disableRowSelectionOnClick
                disableColumnFilter
                paginationModel={paginationModel}
                onPaginationModelChange={(model) => setPaginationModel(model)}
                density={density}
                slots={{
                    toolbar: () => <CustomGridToolbar title={toolbarTitle} onDensityClick={setDensity} density={density} onExport={handleExport} >{headerChildren}</CustomGridToolbar>,
                    pagination: () => (
                        <CustomGridPagination count={rows?.length} pageSizeOption={10} />
                    ),
                }}
            />
        </div>
    );
}
