import React from "react";
import { Box, Button, SxProps, Theme, useTheme } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface DrawerFooterProps {
  buttonOneText?: string;
  buttonTwoText?: string;
  buttonThreeText?: string;
  buttonOneIcon?: SvgIconComponent;
  buttonTwoIcon?: SvgIconComponent;
  buttonThreeIcon?: SvgIconComponent;
  onButtonOneClick?: () => void;
  onButtonTwoClick?: () => void;
  onButtonThreeClick?: () => void;
  sx?: SxProps<Theme>;
  buttonOneDisable?: boolean;
  buttonTwoDisable?: boolean;
  buttonThreeDisable?: boolean;
  loading?: boolean;
}

const DrawerFooter: React.FC<DrawerFooterProps> = ({
  buttonOneText,
  buttonTwoText,
  buttonThreeText,
  buttonOneIcon: ButtonOneIcon,
  buttonTwoIcon: ButtonTwoIcon,
  buttonThreeIcon: ButtonThreeIcon,
  onButtonOneClick,
  onButtonTwoClick,
  onButtonThreeClick,
  sx,
  buttonOneDisable,
  buttonTwoDisable,
  buttonThreeDisable,
  loading = false,
}) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      alignItems="center"
      padding={1.5}
      position="absolute"
      sx={{
        left: 0,
        right: 0,
        zIndex: 20,
        bottom: 0,
        borderTop: "1px solid #dddee3",
        height: "90px",
        ...sx,
      }}
    >
      <Box display="flex" gap={1} marginLeft="auto">
        {/* Button one for Save and send functionalities */}
        {buttonOneText && (
          <Button
            variant="contained"
            sx={{
              background: "#7F56D9",
              textTransform: "none",
              px: "18px",
              py: "12px",
              minWidth: 200,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1rem",
            }}
            type="submit"
            loading={loading}
            size="large"
            loadingPosition="end"
            onClick={onButtonOneClick}
            disabled={buttonOneDisable}
            startIcon={ButtonOneIcon ? <ButtonOneIcon /> : null}
          >
            {buttonOneText}
          </Button>
        )}
        {/* Button Three is Optional  */}
        {buttonThreeText && (
          <Button
            variant="contained"
            color="primary"
            onClick={onButtonThreeClick}
            disabled={buttonThreeDisable}
            startIcon={ButtonThreeIcon ? <ButtonThreeIcon /> : null}
            size="medium"
          >
            {buttonThreeText}
          </Button>
        )}
        {/* Button Two is cancel the fuctionality and close the drawer */}
        {buttonTwoText && (
          <Button
            variant="text"
            color="primary"
            onClick={onButtonTwoClick}
            disabled={buttonTwoDisable}
            startIcon={ButtonTwoIcon ? <ButtonTwoIcon /> : null}
            size="medium"
          >
            {buttonTwoText}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default DrawerFooter;
