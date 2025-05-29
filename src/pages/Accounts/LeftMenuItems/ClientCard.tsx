import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    AvatarGroup,
    IconButton,
    Card,
    CardContent,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';

interface ClientCardProps {
    title: string;
    account: string;
    contact: string;
    phone: string;
    lastReview: string;
    nextReview: string;
    avatars: string[];
}

const ClientCard: React.FC<ClientCardProps> = ({
    title,
    account,
    contact,
    phone,
    lastReview,
    nextReview,
    avatars,
}) => {
    return (
        <Card
            elevation={0} sx={{ border: "1px solid #E0E0E0", borderRadius: "10px", }}
        >
            <CardContent sx={{ paddingBottom: 1 }}>
                <Typography fontWeight={600} fontSize="16px" mb={2}>
                    {title}
                </Typography>

                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography color="text.secondary" fontSize="14px">
                        Account:
                    </Typography>
                    <Typography fontWeight={600} fontSize="14px">
                        {account}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography color="text.secondary" fontSize="14px">
                        Primary contact
                    </Typography>
                    <Typography fontWeight={600} fontSize="14px">
                        {contact}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography color="text.secondary" fontSize="14px">
                        Phone
                    </Typography>
                    <Typography fontWeight={600} fontSize="14px">
                        {phone}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Box display="flex" alignItems="center">
                        <AvatarGroup max={4}>
                            {avatars.map((url, index) => (
                                <Avatar key={index} src={url} />
                            ))}
                        </AvatarGroup>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: '#F3F4F6',
                                color: '#6B7280',
                                ml: 1,
                                border: '1px dashed #D1D5DB',
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </Avatar>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <IconButton
                            // size="small"
                            sx={{ alignItems: "center" }}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </Box>
                </Box>


                <Box mt={1} pt={1} borderTop="1px solid #E5E7EB">
                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography color="text.secondary" fontSize="14px">
                            Last review
                        </Typography>
                        <Typography fontWeight={600} fontSize="14px">
                            {lastReview}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography color="text.secondary" fontSize="14px">
                            Next review
                        </Typography>
                        <Typography fontWeight={600} fontSize="14px">
                            {nextReview}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ClientCard;
