import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
  sales: number;
  invoices: number;
}

const initialState: DashboardState = {
  sales: 0,
  invoices: 0,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSales(state, action: PayloadAction<number>) {
      state.sales = action.payload;
    },
    setInvoices(state, action: PayloadAction<number>) {
      state.invoices = action.payload;
    },
  },
});

export const { setSales, setInvoices } = dashboardSlice.actions;
export default dashboardSlice.reducer;