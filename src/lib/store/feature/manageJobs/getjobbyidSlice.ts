import { GetJobByIdService } from "@/service/managejobs/get-job-by-id.service";
import { JobDetails } from "@/inteface/manage-jobs/getjobbyidinterface";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosResponse, HttpStatusCode } from "axios";
import { setAuthorizationToken } from "@/lib/axiosInstance";

interface IinitalState {
  loading: boolean;
  error: string | null;
  data: JobDetails[];
}

export const getJobByIdAsync = createAsyncThunk(
  "jobType/getJobType",
  async ({ token, id }: { token: string; id: string }) => {
    console.log(`${token} token, ${id} id`);
    try {
      setAuthorizationToken(token);
      const { status, data }: AxiosResponse<JobDetails[]> =
        await GetJobByIdService.manageJob(token, id);

      switch (status) {
        case HttpStatusCode.Ok: {
          console.log(data, "Fetched Job Successfully");
          return data;
        }
        case HttpStatusCode.NoContent: {
          return [];
        }
        default: {
          throw new Error("Unexpected response status");
        }
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }
);

const initialState: IinitalState = {
  error: "",
  loading: false,
  data: [],
};

export const getJobByIdSlice = createSlice({
  name: "job-manage",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IinitalState>) => {
    builder.addCase(getJobByIdAsync.fulfilled, (state, action) => {
      state.data = action.payload as JobDetails[];
    });
  },
});

export default getJobByIdSlice.reducer;
