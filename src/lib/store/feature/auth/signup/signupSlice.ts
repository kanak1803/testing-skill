import { EStepAuthType } from "@/enum/auth/auth_step.enum";
import { ELocalStorage } from "@/enum/localStorage/localStorage.enum";
import { ENaviation } from "@/enum/routing/navition.enum";
import { SignupService } from "@/service/auth/signup.service";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError, HttpStatusCode } from "axios";
import moment from "moment";

// Define the response and error structures
interface SignupResponse {
  auth_id: number;
}

interface SignupError {
  error: string;
  time: string;
}

// Define the async thunk with correct rejectValue type for better type safety
export const postSignupEmailAsync = createAsyncThunk<
  SignupResponse,
  { ipId: number; email: string; password: string },
  { rejectValue: SignupError }
>(
  "auth/postSignupEmail",
  async (
    body: { ipId: number; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data, status } = await SignupService.postSendEmail({
        ip_id: 2,
        email: body.email,
        password: body.password,
      });
      if (status === HttpStatusCode.Created || status === HttpStatusCode.Ok) {
        return data;
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.status === HttpStatusCode.Unauthorized) {
          return rejectWithValue({
            error: error.response?.data || "Unauthorized",
            time: new Date().toISOString(),
          });
        }
      }
      return rejectWithValue({
        error: "An unknown error occurred",
        time: new Date().toISOString(),
      });
    }
  }
);

export const postVerifyEmailAsync = createAsyncThunk(
  "signup/postVerifyEmail",
  async (body: { auth_id: number; otp: string }, { rejectWithValue }) => {
    try {
      const {} = await SignupService.postVerifyEmail(body);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        switch (error.status) {
          case HttpStatusCode.BadRequest: {
            return rejectWithValue(error.response?.data);
          }
          case HttpStatusCode.Unauthorized: {
            return rejectWithValue({
              auth_step: EStepAuthType.PhoneNotVerified,
            });
          }
          default: {
            return rejectWithValue(error.response?.data);
          }
        }
      }
    }
  }
);

export const patchSendPhoneAsync = createAsyncThunk(
  "signup/patchSendPhone",
  async (body: { auth_id: number; phone_number: string }) => {
    try {
      const data = await SignupService.patchSendPhone(body);
      console.log(data, "testing data");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  }
);

export const patchVerifyPhoneAsync = createAsyncThunk(
  "signup/patchVerifyPhone",
  async (body: { auth_id: number; id_token: string }, { rejectWithValue }) => {
    try {
      await SignupService.patchVerifyPhone(body);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.status === HttpStatusCode.Unauthorized) {
          return rejectWithValue(error.response?.data);
        }
      }
    }
  }
);

interface IInitialState {
  loading: boolean;
  data: SignupResponse | null;
  error: string | null;
  redirect: string | null;
  auth_step: EStepAuthType | null;
}

const initialState: IInitialState = {
  loading: false,
  data: null,
  redirect: null,
  error: "",
  auth_step: null,
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IInitialState>) => {
    builder.addCase(postSignupEmailAsync.pending, (state) => {
      state.loading = true; // Set loading to true when the API call starts
      state.error = null; // Clear any previous errors
    });
    builder.addCase(
      postSignupEmailAsync.fulfilled,
      (state, action: PayloadAction<SignupResponse>) => {
        state.loading = false;
        state.redirect = `/${ENaviation.Verify}`;
        if (action.payload?.auth_id !== undefined) {
          localStorage.setItem(
            ELocalStorage.AuthId,
            action.payload.auth_id.toString()
          );
        } else {
          console.error("auth_id is missing in the response:", action.payload);
        }
      }
    );
    builder.addCase(
      postSignupEmailAsync.rejected,
      (state, action: PayloadAction<SignupError | undefined>) => {
        if (action.payload) {
          state.error = `${action.payload.error} ${moment(
            action.payload.time
          ).format("MMMM Do YYYY, h:mm:ss a")}`;
        }
      }
    );
    /* eslint-disable @typescript-eslint/no-explicit-any */
    builder.addCase(
      postVerifyEmailAsync.rejected,
      (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        if (action?.payload?.error) state.error = action.payload;
        else if (action?.payload.auth_step) {
          state.auth_step = action.payload;
        }
      }
    );
    builder.addCase(patchVerifyPhoneAsync.rejected, (state) => {
      state.redirect = `/${ENaviation.Register}`;
    });
  },
});

export default signupSlice.reducer;
