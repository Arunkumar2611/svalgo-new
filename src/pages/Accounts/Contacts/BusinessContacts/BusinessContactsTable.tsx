import {
    useTheme,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import CustomDataGrid from "../../../../components/DataGrid2/CustomDataGrid";
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BusinessContactToolbar from "./BusinessContactToolbar";
import CustomDrawer from "../../../../components/CustomDrawer/CustomDrawer";
import BusinessContactEditContent from "./BusinessContactEditContent";



export default function BusinessContactTable() {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const columns = [
        {
            field: "firstname",
            headerName: "First Name",
            flex: 1,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "lastname",
            headerName: "Last Name",
            flex: 1,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "phone",
            headerName: "Phone",
            flex: 1,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "fax",
            headerName: "Fax",
            flex: 1,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "action",
            headerName: "Action",
            width: 100,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

                const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
                    setAnchorEl(event.currentTarget);
                };

                const handleMenuClose = () => {
                    setAnchorEl(null);
                };

                const handleEdit = () => {
                    setSelectedRow(params.row);
                    setDrawerOpen(true);
                    handleMenuClose();
                };

                const handleDelete = () => {
                    console.log("Delete row:", params.row);
                    handleMenuClose();
                };

                return (
                    <>
                        <IconButton onClick={handleMenuClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleEdit}>Edit</MenuItem>
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        </Menu>
                    </>
                );
            },
        },
    ];


    const rows = [
        {
            id: 1,
            firstname: "Arun",
            lastname: "Kumar",
            phone: "9898777777",
            fax: "abc",
            email: "arun@gmail.com",
            action: "Edit",
        },
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

    const handleEdit = (row) => {
        setSelectedRow(row);
        setDrawerOpen(true);
    };

    const handleSave = () => {
        console.log("Saved data:", selectedRow);
        setDrawerOpen(false);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleDelete = () => {
        console.log("Delete row:", selectedRow);
        handleMenuClose();
    };

    return (
        <>
            <CustomDataGrid
                columns={columns}
                rows={rows}
                handleExport={handleExport}
                headerChildren={
                    <BusinessContactToolbar />
                }
            />

            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>

            <CustomDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title="Edit Contact"
                onSubmit={handleSave}
            >
                {selectedRow && (
                    <BusinessContactEditContent
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                    />
                )}
            </CustomDrawer>

        </>
    );
}

