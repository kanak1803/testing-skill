import { JobPostRequest, JobPostResponse } from "@/inteface/manage-jobs/updatejobbyidinterface";
import { JobService } from "@/service/managejobs/patch-job-by-id.service";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse, HttpStatusCode } from "axios";
import { setAuthorizationToken } from "@/lib/axiosInstance";

interface IJobState {
  loading: boolean;
  error: string | null;
  data: JobPostResponse | null;
}

export const createEditJobPostAsync = createAsyncThunk(
  "job/createJobPost",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (params: { token: string; id: string; data: JobPostRequest | any }) => {
    const { token, id, data } = params;
    try {
      console.log("token slice",token )
      setAuthorizationToken(token);
      const { status, data: responseData }: AxiosResponse<JobPostResponse> = await JobService.createJobPost(
        token,
        id,
        data
      );

      switch (status) {
        case HttpStatusCode.Ok: {
          console.log(responseData, "Job Created Successfully");
          return responseData;
        }
        case HttpStatusCode.NoContent: {
          return null;
        }
        default: {
          throw new Error("Unexpected response status");
        }
      }
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }
);

const initialState: IJobState = {
  loading: false,
  error: null,
  data: null,
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IJobState>) => {
    builder.addCase(createEditJobPostAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createEditJobPostAsync.fulfilled,
      (state, action: PayloadAction<JobPostResponse | null>) => {
        state.loading = false;
        if (action.payload) {
          state.data = action.payload;
        }
      }
    );
    builder.addCase(createEditJobPostAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Something went wrong";
    });
  },
});

export default jobSlice.reducer;
