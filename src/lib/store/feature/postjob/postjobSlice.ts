import { IJobPost } from "@/inteface/post-jobs/postJobsInterface";
import { JobPostService } from "@/service/postjobs/postjobsService";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface IJobPostState {
  loading: boolean;
  data: unknown;
  error: unknown;
}

const initialState: IJobPostState = {
  loading: false,
  data: null,
  error: null,
};

export const createJobPostThunk = createAsyncThunk(
  "jobPost/createJobPost",
  async (body: IJobPost, { rejectWithValue }) => {
    try {
      const response = await JobPostService.createJobPost(body);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const jobPostSlice = createSlice({
  name: "jobPost",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IJobPostState>) => {
    builder
      .addCase(createJobPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJobPostThunk.fulfilled, (state, action: PayloadAction<unknown>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createJobPostThunk.rejected, (state, action) => {
        state.error = action.payload || "An error occurred";
        state.loading = false;
      });
  },
});

export default jobPostSlice.reducer;
