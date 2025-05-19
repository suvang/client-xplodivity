/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: "",
};

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ fullName, currentPassword, newPassword }) => {
    return xplodivity
      .put("/userdetails/updateuser", {
        fullName,
        currentPassword,
        newPassword,
      })
      .then((response) => response);
  }
);

export const forgotPasswordEmailLink = createAsyncThunk(
  "forgotPassword",
  async ({ email }) => {
    return xplodivity
      .post("/userdetails/forgot-password", {
        email,
      })
      .then((response) => response);
  }
);

export const verifyResetPasswordLink = createAsyncThunk(
  "verifyResetPassword",
  async ({ id, token, password }) => {
    if (password) {
      return xplodivity
        .post(
          "/userdetails/reset-password",
          { password },
          {
            params: {
              id,
              token,
            },
          }
        )
        .then((response) => response);
    }
    return xplodivity
      .get("/userdetails/reset-password", {
        params: {
          id,
          token,
        },
      })
      .then((response) => response);
  }
);

export const verifyEmail = createAsyncThunk(
  "verifyEmail",
  async ({ id, token }) => {
    return xplodivity
      .get("/userdetails/verify-email", {
        params: {
          id,
          token,
        },
      })
      .then((response) => response);
  }
);

export const resendEmailverification = createAsyncThunk(
  "resendEmailverification",
  async () => {
    return xplodivity
      .get("/userdetails/resend-email-verification")
      .then((response) => response);
  }
);

export const logout = createAsyncThunk("logout", async () =>
  xplodivity.get("/userDetails/logout").then((response) => response)
);

export const deleteProfile = createAsyncThunk("deleteProfile", async () =>
  xplodivity.delete("/userDetails/deleteprofile").then((response) => response)
);

const fulfilledState = async (state, action, isLocalstorage = true) => {
  state.loading = false;
  state.currentUser = action?.payload?.data;
  state.error = "";
  if (action?.payload?.success && isLocalstorage) {
    const item = {
      token: action?.payload?.token,
      expires: action?.payload?.expires,
    };
    if (typeof window !== "undefined")
      localStorage.setItem("token", JSON.stringify(item));
  }
};

const rejectedState = (state, action) => {
  state.loading = false;
  state.currentUser = null;
  state.error = action?.error?.message;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      if (typeof window !== "undefined") localStorage.removeItem("token");
    },
    setCurrentUser: (state, action) => {
      fulfilledState(state, action, true);
    },
  },
  extraReducers: (builder) => {
    // logout
    builder.addCase(logout.pending, deleteProfile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(logout.fulfilled, deleteProfile.fulfilled, (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = "";
    });

    builder.addCase(
      logout.rejected,
      deleteProfile.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      }
    );
  },
});

export const { setCurrentUser, updateCurrentUser } = userSlice.actions;

export default userSlice.reducer;
