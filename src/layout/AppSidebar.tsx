import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Divider,
  Box
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Description as DescriptionIcon,
  CreditCard as CreditCardIcon,
  Archive as ArchiveIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Settings as SettingsIcon,
  AccessTime as AccessTimeIcon,
  BarChart as BarChartIcon,
  CheckBox as CheckBoxIcon,
  Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from "@mui/icons-material";
import { Logo } from "./Logo";

type NavItem = {
  title: string;
  path: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { title: "Dashboard", path: "/", icon: DashboardIcon },
  { title: "Collector Dashboard", path: "/collector", icon: DashboardIcon },
  { title: "Customers", path: "/customers", icon: PeopleIcon },
  { title: "Invoices", path: "/invoices", icon: DescriptionIcon },
  { title: "Payments", path: "/payments", icon: CreditCardIcon },
  { title: "Collections", path: "/collections", icon: ArchiveIcon },
  { title: "Claims", path: "/claims", icon: AssignmentTurnedInIcon },
  { title: "Customer / Order Holds", path: "/order-holds", icon: SettingsIcon },
  { title: "Document Central", path: "/documents", icon: AccessTimeIcon },
  { title: "Reports", path: "/reports", icon: BarChartIcon },
  { title: "Tasks", path: "/tasks", icon: CheckBoxIcon },
  { title: "Notifications", path: "/notifications", icon: NotificationsIcon },
];

interface AppSidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

export function AppSidebar({ onCollapse }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState !== null) {
      const isCollapsed = savedState === "true";
      setCollapsed(isCollapsed);
      if (onCollapse) onCollapse(isCollapsed);
    } else {
      if (onCollapse) onCollapse(false);
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
    if (onCollapse) onCollapse(newState);
  };

  return (
    <Drawer
      variant="permanent"
      open={!collapsed}
      PaperProps={{
        sx: {
          width: collapsed ? 64 : 240,
          transition: "width 0.3s",
          overflowX: "hidden",
          whiteSpace: "nowrap",
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Logo collapsed={collapsed} />
      </Box>

      <List sx={{ py: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;

          const itemContent = (
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                justifyContent: collapsed ? "center" : "flex-start",
                px: collapsed ? 1.5 : 2,
                py: 1.5,
                borderRadius: 1,
                bgcolor: isActive ? "primary.light" : "transparent",
                color: isActive ? "primary.main" : "text.primary",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? 0 : 2,
                  color: isActive ? "primary.main" : "text.secondary",
                }}
              >
                <IconComponent fontSize="small" />
              </ListItemIcon>
              {!collapsed && <ListItemText primary={item.title} />}
            </ListItemButton>
          );

          return (
            <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
              {collapsed ? (
                <Tooltip title={item.title} placement="right">
                  {itemContent}
                </Tooltip>
              ) : (
                itemContent
              )}
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />
      <Box
        sx={{
          p: 1,
          borderTop: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconButton onClick={toggleSidebar} size="small">
          {collapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
        </IconButton>
      </Box>
    </Drawer>
  );
}
