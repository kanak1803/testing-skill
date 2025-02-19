// import { ISignupSendEmail } from "@/interface/signup/signupInterface";
import { ISignupSendEmail } from "@/inteface/signup/signupInterface";
import { SignupService } from "@/service/auth/signup.service";
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

// Define the expected structure of the response payload
interface SignupResponse {
  auth_id: string; // Assuming the response has an auth_id
}

const initialState: IInitialState = {
  loading: false,
  data: "",
  error: "",
};

export const postSignupSendEmail = createAsyncThunk(
  "signup/postSignupSendEmail",
  async (body: ISignupSendEmail) => {
    try {
      const updatedBody = {
        ...body,
        ip_id: Number(body.ip_id),
      };
      const response = await SignupService.postSendEmail(updatedBody);
      return response.data; // Return just the data, which is of type SignupResponse
    } catch (error) {
      console.log(error);
      throw error; // Handle error properly if necessary
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IInitialState>) => {
    builder.addCase(
      postSignupSendEmail.fulfilled,
      (state, action: PayloadAction<SignupResponse>) => {
        // Handle the fulfilled action
        localStorage.setItem("auth_id", action.payload.auth_id); // Use the payload data here
        state.data = action.payload; // Set data as the response
      }
    );
  },
});

export default signupSlice.reducer;
