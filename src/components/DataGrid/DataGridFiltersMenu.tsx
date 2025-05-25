import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Divider, IconButton, InputAdornment, Menu, MenuItem, SxProps, TextField } from "@mui/material";
import React, { useState } from "react";

import { Cancel, Search } from "@mui/icons-material";
import {
    GridCsvExportMenuItem,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarExportContainer,
    GridToolbarFilterButton,
    QuickFilter,
    QuickFilterClear,
    QuickFilterControl,
    useGridApiContext
} from "@mui/x-data-grid";

interface FilterProps  extends React.PropsWithChildren  {
  fileName?: string;
  sx?: SxProps;
  useServerPagination?: boolean;
}

const DataGridFiltersMenu = ({
  fileName = "CSV",
  useServerPagination,
  children,
  sx,
  ...other
}: FilterProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentDate = new Date();
  const exportCsvOptions = {
    fileName: `${fileName}_${currentDate}`,
  };

  const apiRef = useGridApiContext();

  const handleExportCsv = () => {
    if (apiRef.current) {
      apiRef.current.exportDataAsCsv(exportCsvOptions);
    }
  };
  return (
    // <Box className="dataGridFiltersMenuIcon">
    <Box className="commonToolbar" sx={{display:'flex',alignItems:'center',gap:1 ,...sx}}>
        {children}
       <QuickFilter expanded>
          <QuickFilterControl
            render={({ ref, ...other }) => (
              <TextField
                {...other}
                sx={{ width: 300 , '& .MuiInputBase-root': {
                    borderRadius: '8px',
                  },}}
                inputRef={ref}
                aria-label="Search"
                placeholder="Search"
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search  />
                      </InputAdornment>
                    ),
                    endAdornment: other.value ? (
                      <InputAdornment position="end">
                        <QuickFilterClear
                          edge="end"
                          size="small"
                          aria-label="Clear search"
                        //   material={{ sx: { marginRight: -0.75 } }}
                        >
                          <Cancel fontSize="small" />
                        </QuickFilterClear>
                      </InputAdornment>
                    ) : null,
                    ...other.slotProps?.input,
                  },
                  ...other.slotProps,
                }}
              />
            )}
          />
        </QuickFilter>

      <>
        <IconButton
          onClick={handleClick}
          sx={{ width: "32px", height: "32px",p:0 }}
          size="small"
        >
          <MoreVertIcon sx={{color:"#A4A7AE"}} />
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              "& .MuiButtonBase-root": {
                color: "#44546F",
              },
            }}
          >
            <MenuItem>
              <GridToolbarFilterButton />
            </MenuItem>
            <MenuItem>
              <GridToolbarDensitySelector />
            </MenuItem>
            <MenuItem>
              <GridToolbarColumnsButton />
            </MenuItem>
            {!useServerPagination && (
              <>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleExportCsv();
                  }}
                >
                  <GridToolbarExportContainer {...other}>
                    <GridCsvExportMenuItem options={exportCsvOptions} />
                  </GridToolbarExportContainer>
                </MenuItem>
              </>
            )}
          </Box>
        </Menu>
      </>
    </Box>
  );
};

export default DataGridFiltersMenu;
