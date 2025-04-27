import { combineReducers } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
// Import other reducers as you create them

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  // Add other reducers here
});

export default rootReducer;