import { JobLevelService } from "@/service/postjobs/job-level.service";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosResponse, HttpStatusCode } from "axios";

interface IJobCategory {
  id: number;
  title: string;
}

interface IinitalState {
  loading: boolean;
  error: string | null;
  data: IJobCategory[];
}

export const getJobLevelAsync = createAsyncThunk(
  "jobLevel/getJobLevel",
  async () => {
    try {
      const { status, data }: AxiosResponse<IJobCategory[]> =
        await JobLevelService.getCategory();

      switch (status) {
        case HttpStatusCode.Ok: {
          console.log(data, "testing data");
          return data;
        }
        case HttpStatusCode.NoContent: {
          return [];
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

export const jobLevelSlice = createSlice({
  name: "job-level",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IinitalState>) => {
    builder.addCase(getJobLevelAsync.fulfilled, (state, action) => {
      // Specify the correct type for action.payload (IJobCategory[])
      state.data = action.payload as IJobCategory[];
    });
  },
});

export default jobLevelSlice.reducer;
