import { Chip } from "@mui/material";
import React from "react";

export interface StatusChipProps {
  status?: string;
  label?: React.ReactNode;
  badgeStyle?: BadgeStyle;
}

 
type BadgeStyle = "INFO" | "ERROR" | "SUCCESS" | "HIGH" | "PENDING" | "ATTENTION" | "DONE" | "INPROGRESS";

 
const categorizeStatuses = (categories: Record<BadgeStyle, string[]>): Record<string, BadgeStyle> =>
  Object.entries(categories).reduce<Record<string, BadgeStyle>>((acc, [key, values]) => {
    values.forEach((value) => (acc[value] = key as BadgeStyle));
    return acc;
  }, {});

 
const STATUS_MAP: Record<string, BadgeStyle> = categorizeStatuses({
  PENDING: ["OPEN", "PENDING", "PENDING_SETTLEMENT"],
  ERROR: ["CANCELLED", "CANCELED", "DECLINE", "DISCARD", "FAIL", "INTERNAL_FAILURE", "INACTIVE", "EXPIRED" ,'Over due' ,'Disputed'],
  ATTENTION: ["UNPAID", "HOLD", "ONHOLD", "MEDIUM", "REASSIGNED", "SCHEDULED", "Draft"],
  SUCCESS: ["APPROVE", "PAID", "ACTIVE", "ASSIGNED"],
  DONE: ["CLOSE", "RELEASED", "PUBLISHED", "PUBLISH", "LOW", "VERY_LOW", "VERYLOW", "Low", "COMPLETED", "SUBMITTED", "Published"],
  HIGH: ["VERYHIGH", "HIGH"],
  INFO: ["IN_PROGRESS"],
  INPROGRESS:["IN_PROGRESS"]
});

 
const getStatusStyles = (): {
    [key: string]: { textColor: string; bgColor: string; borderColor: string };
  } => ({
    INFO: {
      textColor: '#00796B',     // Teal A600
      bgColor: '#E0F2F1',       // Teal A50
      borderColor: '#B2DFDB',   // Teal A100
    },
    ERROR: {
      textColor: '#D32F2F',     // Red A400
      bgColor: '#FFEBEE',       // Red A50
      borderColor: '#FFCDD2',   // Red A100
    },
    SUCCESS: {
      textColor: '#388E3C',     // Green A600
      bgColor: '#E8F5E9',       // Green A50
      borderColor: '#ABEFC6',   // Green A100
    },
    DONE: {
        textColor: '#388E3C',     // Green A600
        bgColor: '#E8F5E9',       // Green A50
        borderColor: '#ABEFC6',   // Green A100
      },
    // DONE: {
    //   textColor: '#067647',     // Lime A600
    //   bgColor: '#ECFDF3',       // Lime A50
    //   borderColor: '#F0F4C3',   // Lime A100
    // },
    HIGH: {
      textColor: '#C62828',     // Red A600
      bgColor: '#FFEBEE',       // Red A50
      borderColor: '#FFCDD2',   // Red A100
    },
    PENDING: {
      textColor: '#7B1FA2',     // Purple A600
      bgColor: '#F3E5F5',       // Purple A50
      borderColor: '#ABEFC6',   // Purple A100
    },
    ATTENTION: {
      textColor: '#B54708',     // Yellow A300
      bgColor: '#FFFAEB',       // Yellow A50
      borderColor: '#FEDF89',   // Yellow A100
    },
   
    INPROGRESS: {
      textColor: '#EF6C00',     // Orange A600
      bgColor: '#FFF3E0',       // Orange A50
      borderColor: '#FFE0B2',   // Orange A100
    },
  });
  
const LABEL_DESCRIPTIONS: Record<string, string> = { 
  APPROVE: "APPROVED",
  DECLINE: "DECLINED"
};

const StatusChip: React.FC<StatusChipProps> = ({ status ,label, badgeStyle}) => {
//   const theme = useTheme();
  const STATUS_STYLES = getStatusStyles();

 
  const mappedStatus: BadgeStyle = badgeStyle ?? STATUS_MAP[status ?? "SUCCESS"] ?? "SUCCESS";
  const styles = STATUS_STYLES[mappedStatus] ?? STATUS_STYLES.INFO;

  return (
    <Chip
    label={label ?? LABEL_DESCRIPTIONS[status ?? ""] ?? status?.replace(/_/g, " ")}
    sx={{
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "20px",
      textTransform: "uppercase",
      borderRadius: "16px",
      height: "24px",
      width: "auto",
      padding: "2px 8px",
      color: styles.textColor,
      backgroundColor: styles.bgColor,
      border: `1px solid ${styles.borderColor}`,
      boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    }}
  />  
  );
};

export default StatusChip;

