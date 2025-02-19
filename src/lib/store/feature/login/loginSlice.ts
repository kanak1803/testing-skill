import { IsLogin } from "@/inteface/login/loginInterface";
import { LoginService } from "@/service/login/loginService";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface IInitialState {
  loading: boolean;
  data: unknown;
  error: unknown;
}

const initialState: IInitialState = {
  loading: false,
  data: "",
  error: "",
};

export const postLoginSendEmail = createAsyncThunk(
  "signin/postLoginSendEmail",
  async (body: IsLogin, { rejectWithValue }) => {
    try {
      const response = await LoginService.loginEmail(body);
      return response;
    }  catch (error: unknown) {
      // Handle unknown error safely
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IInitialState>) => {
    builder
      .addCase(postLoginSendEmail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postLoginSendEmail.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
        localStorage.setItem("token", action.payload.token);
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(postLoginSendEmail.rejected, (state, action) => {
        state.error = action.payload || "An error occurred";
        state.loading = false;
      });
  },
});

export default loginSlice.reducer;
