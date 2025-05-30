import CustomDrawer from "../../components/Drawer/Drawer";
import { Box, IconButton } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CustomerInformation from "./CustomerInformation";

const CustomerDrawer = ({ toggleOpen }: { toggleOpen: () => void }) => {
  return (
    <CustomDrawer
      drawerTitle={"Create a task"}
      toggleDrawer={toggleOpen}
      isArrow
      size="md"
      headerAction={
        <IconButton size="small" sx={{ mr: 2 }}>
          <OpenInFullIcon sx={{ color: "#A4A7AE", fontSize: "20px" }} />
        </IconButton>
      }
    >
      <Box>
        <CustomerInformation toggleOpen={toggleOpen} />
      </Box>
    </CustomDrawer>
  );
};

export default CustomerDrawer;
