import { JobMaximumExpService } from "@/service/postjobs/job-maximum-exp.service";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosResponse, HttpStatusCode } from "axios";

interface IinitalState {
  loading: boolean;
  error: string | null;
  data: Array<{ id: number; title: string }>;
}

export const getJobMaximumExpAsync = createAsyncThunk(
  "jobType/getJobType",
  async () => {
    try {
      const {
        status,
        data,
      }: AxiosResponse<Array<{ id: number; title: string }>> =
        await JobMaximumExpService.getCategory();

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

export const jobMaximumExpSlice = createSlice({
  name: "job-type",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IinitalState>) => {
    builder.addCase(getJobMaximumExpAsync.fulfilled, (state, action) => {
      // Specify the correct type for action.payload
      state.data = action.payload as Array<{ id: number; title: string }>;
    });
  },
});

export default jobMaximumExpSlice.reducer;
