import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import axios from "axios";

export interface User {
  _id: string;
  token: string;
  name: string;
  email: string;
  password: string;
}

export interface UserState {
  value: User;
  userStatusError?: { name: string; password: string; email: string };
  status: string;
}

const initialState: UserState = {
  value: {
    _id: "",
    token: "",
    name: "",
    email: "",
    password: "",
  },
  status: "idle",
};

const USER_URL = "http://localhost:5000/user";

export const checkAuth = createAsyncThunk("user/auth", async () => {
  const response = await axios.get(`${USER_URL}/auth`, {
    withCredentials: true,
  });
  return response.data;
});

export const RegisterUser = createAsyncThunk(
  "user/register",
  async (userData: { name: string; email: string; password: string }) => {
    const response = await axios.post(USER_URL, userData, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const LoginUser = createAsyncThunk(
  "user/login",
  async (userData: { loginEmail: string; loginPassword: string }) => {
    const response = await axios.post(`${USER_URL}/login`, userData, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const LogOutUser = createAsyncThunk("user/logout", async () => {
  const response = await axios.get(`${USER_URL}/logout`, {
    withCredentials: true,
  });
  return response;
});
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        if (action.payload.errors) {
          state.userStatusError = action.payload.errors;
        } else {
          state.value = action.payload;
          console.log("Registered successfully");
          state.status = "succeeded";
          state.userStatusError = {name: "", password: "", email: ""};
          localStorage.setItem("verify", action.payload.data.token);
        }
      })
      .addCase(RegisterUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(LoginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        if (action.payload.errors) {
          state.userStatusError = action.payload.errors;
        } else {
          state.value = action.payload;
        }
        state.status = "succeeded";
        state.userStatusError = {name: "", password: "", email: ""};  
        localStorage.setItem("verify", action.payload.token);
      })
      .addCase(LoginUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload === "No token available") {
          localStorage.removeItem("verify");
        } else if (action.payload === "jwt expired") {
          localStorage.removeItem("verify");
        } else {
          localStorage.setItem("verify", action.payload.user.token);
          state.value = action.payload.user;
        }
      });
  },
});

export const getUser = (state: RootState) => state.user.value;
export const getUserStatus = (state: RootState) => state.user.status;

export const getUserStatusError = (state: RootState) =>
  state.user.userStatusError;

export default userSlice.reducer;
