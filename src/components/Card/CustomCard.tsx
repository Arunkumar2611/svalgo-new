import { ReactNode } from "react";
import { Card, CardHeader, Divider, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { shouldForwardProp } from "@mui/system";

const StyledCard = styled(Card, { shouldForwardProp })({
    width: "100%",
    minHeight: "455px",
    height: "auto"
});

export const HeaderTypography = styled(Typography)({
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "28px",
    letterSpacing: 0,
    color: "#212121", // Default color since theme is unused
});

const StyledCardHeader = styled(CardHeader, {
    shouldForwardProp: (prop) => prop !== 'headerBgColor',
})(({ headerBgColor }) => ({
    padding: "16px",
    backgroundColor: headerBgColor || 'transparent', // default to transparent
    "& .MuiCardHeader-content": {
        padding: 0,
        margin: 0,
    },
    "& .MuiCardHeader-action": {
        marginTop: 0,
        marginRight: 0,
    },
}));


const CustomCardContent = styled(Box)({
    padding: 0,
});

interface CustomCardProps {
    titleAsText?: string;
    titleAsComponent?: ReactNode;
    headerBgColor?: ReactNode;
    action?: ReactNode;
    main?: ReactNode;
}

export default function CustomCard({
    titleAsText,
    titleAsComponent,
    action,
    headerBgColor,
    main,
    ...props
}: CustomCardProps) {
    const renderTitle = () => {
        if (titleAsComponent) return titleAsComponent;
        if (titleAsText) return <HeaderTypography>{titleAsText}</HeaderTypography>;
        return null;
    };

    return (
        <StyledCard variant="outlined" {...props}>
            <StyledCardHeader
                headerBgColor={headerBgColor}
                action={action}
                title={<Box sx={{ p: 0 }}>{renderTitle()}</Box>}
            />
            <Divider />
            <CustomCardContent>{main}</CustomCardContent>
        </StyledCard>
    );
}
