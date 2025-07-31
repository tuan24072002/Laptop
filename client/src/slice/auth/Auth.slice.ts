import { AuthService } from "@/services/Auth.service";
import { createSlice } from "@reduxjs/toolkit";
import { BasicSliceState } from "../state";
import { commonCreateAsyncThunk } from "../thunk";
import { errorMessage } from "@/utils/util";
import { HttpService } from "@/services/http/HttpService";

export const loginCall: any = commonCreateAsyncThunk({
  type: "auth/login",
  action: AuthService.login,
});
export const registerCall: any = commonCreateAsyncThunk({
  type: "auth/register",
  action: AuthService.register,
});
export const verifyEmail: any = commonCreateAsyncThunk({
  type: "auth/verifyEmail",
  action: AuthService.verifyEmail,
});
export const resendVerifyEmail: any = commonCreateAsyncThunk({
  type: "auth/resendVerifyEmail",
  action: AuthService.resendVerifyEmail,
});
export const sendCodeChangePass: any = commonCreateAsyncThunk({
  type: "auth/sendCodeChangePass",
  action: AuthService.sendCodeChangePass,
});
export const forgotPassword: any = commonCreateAsyncThunk({
  type: "auth/forgotPassword",
  action: AuthService.forgotPassword,
});
export const resetPassword: any = commonCreateAsyncThunk({
  type: "auth/resetPassword",
  action: AuthService.resetPassword,
});
interface AuthState extends BasicSliceState {
  remember: boolean;
  showUserLogin: boolean;
  showEmailVerification: boolean;
  statusRegister: "idle" | "loading" | "completed" | "failed";
  statusVerifyEmail: "idle" | "loading" | "completed" | "failed";
  statusResendVerifyEmail: "idle" | "loading" | "completed" | "failed";
  statusSendCodeChangePass: "idle" | "loading" | "completed" | "failed";
  statusForgotPassword: "idle" | "loading" | "completed" | "failed";
  statusResetPassword: "idle" | "loading" | "completed" | "failed";
}
const initialState: AuthState = {
  remember: false,
  showUserLogin: false,
  showEmailVerification: false,
  status: "idle",
  statusRegister: "idle",
  statusVerifyEmail: "idle",
  statusResendVerifyEmail: "idle",
  statusSendCodeChangePass: "idle",
  statusForgotPassword: "idle",
  statusResetPassword: "idle",
  error: "",
  success: "",
  action: "VIE",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
    resetStatusRegister: (state) => {
      state.statusRegister = "idle";
    },
    resetStatusVerifyEmail: (state) => {
      state.statusVerifyEmail = "idle";
    },
    resetStatusResendVerifyEmail: (state) => {
      state.statusResendVerifyEmail = "idle";
    },
    resetStatusSendCodeChangPass: (state) => {
      state.statusSendCodeChangePass = "idle";
    },
    resetStatusForgotPassword: (state) => {
      state.statusForgotPassword = "idle";
    },
    resetStatusResetPassword: (state) => {
      state.statusResetPassword = "idle";
    },
    setShowUserLogin: (state, action) => {
      state.showUserLogin = action.payload;
    },
    setShowEmailVerification: (state, action) => {
      state.showEmailVerification = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginCall.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginCall.fulfilled, (state, action) => {
        state.status = "completed";
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
        const data = action.payload.data.data;
        localStorage.setItem("accessToken", data.tokens.accessToken);
        HttpService.setToken(data.tokens.accessToken);
        localStorage.setItem("refreshToken", data.tokens.refreshToken);
        HttpService.setLocalRefToken(data.tokens.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .addCase(loginCall.rejected, (state, action) => {
        state.status = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })
      .addCase(registerCall.pending, (state) => {
        state.statusRegister = "loading";
      })
      .addCase(registerCall.fulfilled, (state, action) => {
        state.statusRegister = "completed";
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
        const data = action.payload.data.data;
        localStorage.setItem("accessToken", data.tokens.accessToken);
        HttpService.setToken(data.tokens.accessToken);
        localStorage.setItem("refreshToken", data.tokens.refreshToken);
        HttpService.setLocalRefToken(data.tokens.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .addCase(registerCall.rejected, (state, action) => {
        state.statusRegister = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })
      .addCase(forgotPassword.pending, (state) => {
        state.statusForgotPassword = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.statusForgotPassword = "completed";
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.statusForgotPassword = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })
      .addCase(resetPassword.pending, (state) => {
        state.statusResetPassword = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.statusResetPassword = "completed";
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.statusResetPassword = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })
      .addCase(verifyEmail.pending, (state) => {
        state.statusVerifyEmail = "loading";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.statusVerifyEmail = "completed";
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.statusVerifyEmail = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })
      .addCase(resendVerifyEmail.pending, (state) => {
        state.statusResendVerifyEmail = "loading";
      })
      .addCase(resendVerifyEmail.fulfilled, (state, action) => {
        state.statusResendVerifyEmail = "completed";
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
      })
      .addCase(resendVerifyEmail.rejected, (state, action) => {
        state.statusResendVerifyEmail = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })
      .addCase(sendCodeChangePass.pending, (state) => {
        state.statusSendCodeChangePass = "loading";
      })
      .addCase(sendCodeChangePass.fulfilled, (state, action) => {
        state.statusSendCodeChangePass = "completed";
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
      })
      .addCase(sendCodeChangePass.rejected, (state, action) => {
        state.statusSendCodeChangePass = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      });
  },
});
export const {
  resetStatus,
  resetStatusRegister,
  setShowUserLogin,
  setShowEmailVerification,
  resetStatusVerifyEmail,
  resetStatusResendVerifyEmail,
  resetStatusSendCodeChangPass,
  resetStatusForgotPassword,
  resetStatusResetPassword,
} = authSlice.actions;
export default authSlice.reducer;
