  import { BorderRight } from "@mui/icons-material";
import { styled, Tabs, TabsProps } from "@mui/material";

  interface CustomTabProps extends TabsProps {
    left?: number,
    width?: number,
    orientation?: "horizontal" | "vertical";
   }

 export const StyledTabs = styled((props: CustomTabProps) => {
  const { ...other } = props;
  return <Tabs {...other} />;
})<CustomTabProps>(({ theme,  orientation = "horizontal" }) => {

    return ({
      boxSizing: "border-box",
      minHeight: "36px !important",
      marginTop: "0px !important",
      width: 'fit-content',
      color:  "#717680",
      // backgroundColor: 'red',
      border:'1px solid #ccc',
      borderRadius:'8px',
      // borderBottom: orientation === "horizontal" ? "1px solid" : "none",
      // borderBottomColor:'red',
      position: "relative",
      "& .css-1afximb-MuiTabs-scroller": {
        position: "unset",
        overflow: "visible",
      },
      "& .MuiTabs-flexContainer": {
        height: "100%",
        minHeight: "36px !important",
        borderBottom: "none",
        flexDirection: orientation === "vertical" ? "column" : "row",
        gap: "0px",
      },
      "& .MuiTabs-indicator" :{
        display: "none",
      },
        "& .MuiTabs-scrollButtons": {
        display: "none",
      },
      ".MuiButtonBase-root" :{color: "#717680" ,minHeight: "36px !important",},
      ".MuiTabs-scroller " :{
        height: '36px !important',
      },
      "& .MuiTab-root": {
        textTransform: "none",
        minWidth: "unset",
        padding: "12px !important",
        fontSize: "14px",
        fontWeight: 500,
        justifyContent: orientation === "vertical" ? "flex-start" : "center",
        borderRight: orientation === "vertical" ? "3px solid transparent" : undefined,
        "&:hover": {
          backgroundColor:  "#F4EBFF",
          borderRadius:'8px !important'
        },
      
        "&.Mui-selected": {
          // borderRight: orientation === "vertical" ? `3px solid ${theme.palette.primary.main}` : undefined,
          backgroundColor:  "#F4EBFF",
          color:  "#7F56D9",
          borderRight: "1px solid #D5D7DA",
          borderLeft: "1px solid #D5D7DA",
          borderRadius:'8px !important'
        },
          },
    })
  });
