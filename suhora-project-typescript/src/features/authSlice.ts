import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  users: User[];
}

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  users: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const { name, email, password } = action.payload;
      const isDuplicate = state.users.some((user) => {
        return user.email === email;
      });

      if (isDuplicate) {
        toast.warning(`${name} already exists`);
      } else {
        state.users.push({
          name,
          email,
          password,
        });
        toast.success(`User ${name} created successfully`);
      }
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      const user = state.users.find((user) => {
        return user.email === email;
      });

      if (user && user.password === password) {
        state.currentUser = user;
        state.isAuthenticated = true;
        toast.success(`User ${user.name} logged in successfully`);
      } else {
        state.currentUser = null;
        state.isAuthenticated = false;
        toast.error(`Invalid credentials`);
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      toast.success(`Logged out successfully`);
    },
  },
});

export const { addUser, login, logout } = authSlice.actions;
export default authSlice.reducer;
