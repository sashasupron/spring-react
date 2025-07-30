import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducers";
import projectsReducer from "./reducers/projectsReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer
  }
});

export default store;
