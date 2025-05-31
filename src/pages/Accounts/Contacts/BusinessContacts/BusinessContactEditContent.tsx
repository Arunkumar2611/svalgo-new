import React from "react";
import { Box, TextField } from "@mui/material";

export default function BusinessContactEditContent({
  selectedRow,
  setSelectedRow,
}: {
  selectedRow: any;
  setSelectedRow: (row: any) => void;
}) {
  return (
    <Box>
      <TextField
        label="Invoice"
        fullWidth
        margin="normal"
        value={selectedRow.invoice || ""}
        onChange={(e) =>
          setSelectedRow({ ...selectedRow, invoice: e.target.value })
        }
      />
      <TextField
        label="Date"
        fullWidth
        margin="normal"
        value={selectedRow.date || ""}
        onChange={(e) =>
          setSelectedRow({ ...selectedRow, date: e.target.value })
        }
      />
      <TextField
        label="Payment Term"
        fullWidth
        margin="normal"
        value={selectedRow.paymentTerm || ""}
        onChange={(e) =>
          setSelectedRow({ ...selectedRow, paymentTerm: e.target.value })
        }
      />
      <TextField
        label="Balance (USD)"
        fullWidth
        margin="normal"
        value={selectedRow.balance || ""}
        onChange={(e) =>
          setSelectedRow({ ...selectedRow, balance: e.target.value })
        }
      />
      <TextField
        label="Invoice Amount"
        fullWidth
        margin="normal"
        value={selectedRow.invoiceAmount || ""}
        onChange={(e) =>
          setSelectedRow({ ...selectedRow, invoiceAmount: e.target.value })
        }
      />
      <TextField
        label="Due Date"
        fullWidth
        margin="normal"
        value={selectedRow.dueDate || ""}
        onChange={(e) =>
          setSelectedRow({ ...selectedRow, dueDate: e.target.value })
        }
      />
      <TextField
        label="Aging Days"
        fullWidth
        margin="normal"
        value={selectedRow.agingDays || ""}
        onChange={(e) =>
          setSelectedRow({ ...selectedRow, agingDays: e.target.value })
        }
      />
    </Box>
  );
}
