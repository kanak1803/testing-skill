import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RegisterInterface } from "@/inteface/recruiter-register/recruiterInterface";
import { RegisterService } from "@/service/registerrecruiter/registerCompanyService";

interface RegisterState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: unknown; // Adjust if you have a specific type for the API response
}

const initialState: RegisterState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

// Thunk to register a recruiter
export const registerRecruiter = createAsyncThunk(
  "recruiter/register",
  async (data: RegisterInterface, { rejectWithValue }) => {
    try {
      const response = await RegisterService.registerRecruiter(data);
      return response; // Return successful response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message); // Return error message if failed
      }
      return rejectWithValue("An unknown error occurred"); // Fallback error
    }
  }
);

const registerSlice = createSlice({
  name: "recruiterRegister",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerRecruiter.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerRecruiter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload; // Store response data
      })
      .addCase(registerRecruiter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Store error message
      });
  },
});

export const { resetState } = registerSlice.actions;
export default registerSlice.reducer;
