import React from "react";
import { Box, IconButton } from "@mui/material"
import TableWithSubheader from "../../components/Table/TableWithSubheader";
import CustomCard from "../../components/Card/CustomCard";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface RowData {
    [key: string]: string;
}

const TopCustomerTable = () => {
    const headers = ['Customer', 'Due amount', 'Due date'];
    const [rows, setRows] = React.useState<RowData[]>([
        { "Customer": 'IronClad Fabrications 1', account: 'AC#34567', "Due amount": '$34,51,501', "Due date": 'Dec 31 2024' },
        { "Customer": 'IronClad Fabrications 2', account: 'AC#34567', "Due amount": '$34,51,501', "Due date": 'Dec 31 2024' },
        { "Customer": 'IronClad Fabrications 3', account: 'AC#34567', "Due amount": '$34,51,501', "Due date": 'Dec 31 2024' },
        { "Customer": 'IronClad Fabrications 4', account: 'AC#34567', "Due amount": '$45,501', "Due date": 'Dec 31 2024' },
    ]);

    return (
        <Box>
            <CustomCard
                // sx={{ height: "545px" }}
                titleAsText="Top Customers"
                action={
                    <Box>
                        <IconButton size="small">
                            <OpenInNewIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                        </IconButton>
                    </Box>
                }
                main={<TableWithSubheader headers={headers} rows={rows} setRows={setRows} />}
            />
        </Box>
    )
}

export default TopCustomerTable