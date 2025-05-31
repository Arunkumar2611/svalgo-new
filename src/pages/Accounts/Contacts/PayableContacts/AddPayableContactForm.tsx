import { TextField, Grid, } from "@mui/material";

export default function AddPayableContactForm({ newContact, setNewContact }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContact((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="First Name"
                    name="firstname"
                    value={newContact.firstname || ""}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Last Name"
                    name="lastname"
                    value={newContact.lastname || ""}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Phone"
                    name="phone"
                    value={newContact.phone || ""}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Fax"
                    name="fax"
                    value={newContact.fax || ""}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    name="email"
                    value={newContact.email || ""}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
        </Grid>
    );
}
