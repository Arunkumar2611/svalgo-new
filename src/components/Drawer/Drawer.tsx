import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Box,
  Card,
  Drawer,
  DrawerProps,
  IconButton,
  Paper,
  SxProps,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode, useEffect } from "react";

const sizes = {
  xxl: 1500,
  xl: 1200,
  lg: 900,
  md: 700,
  sm: 600,
  xs: 400,
  xxs: 300,
  micro: 200,
};

export interface DrawerProp extends DrawerProps {
  toggleDrawer: () => void;
  drawerTitle?: ReactNode | string;
  titleStyles?: SxProps<Theme>;
  isArrow?: boolean;
  bgColor?: string;
  size?: keyof typeof sizes;
  drawerStyles?: SxProps<Theme>;
  ModalProps?: DrawerProps["ModalProps"];
  children?: ReactNode;
  headerAction?: ReactNode;
}

const CustomDrawer = ({
  drawerTitle,
  toggleDrawer,
  headerAction,
  children,
  bgColor,
  anchor = "right",
  titleStyles = {},
  drawerStyles = {},
  size,
  ModalProps,
}: DrawerProp) => {
  const theme = useTheme();

  useEffect(() => {
    const handleEscape = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") toggleDrawer();
    };

    document.addEventListener("keyup", handleEscape);
    return () => document.removeEventListener("keyup", handleEscape);
  }, [toggleDrawer]);

  const drawerWidth = size ? sizes[size] : "auto";

  return (
    <Drawer
      anchor={anchor}
      open={true}
      sx={drawerStyles}
      transitionDuration={{ enter: 5000, appear: 100, exit: 500 }}
      ModalProps={ModalProps}
      slotProps={{
        paper: {
          sx: {
            zIndex: 1,
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
          },
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          height: "100%",
          width: drawerWidth,
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            height: "176px",
            ...titleStyles,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "18px",
              color: "#000",
            }}
          >
            {drawerTitle}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {headerAction}
            <Tooltip title="Close Panel" arrow>
              <IconButton
                onClick={toggleDrawer}
                sx={{
                  "&:hover": {
                    background: "transparent",
                  },
                  p: 0,
                }}
              >
                <HighlightOffIcon sx={{ color: "#A4A7AE" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Body */}
        <Card
          variant="outlined"
          sx={{ height: `calc(100% - 166px)`, borderRadius: "12px" ,overflowY:'auto',p:3 }}
        >
          <Box >{children}</Box>
          {/* <Box sx={{ paddingBottom: theme.spacing(6) }}>{children}</Box> */}
        </Card>
      </Paper>
    </Drawer>
  );
};

export default CustomDrawer;
