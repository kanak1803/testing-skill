import { JobTypeService } from "@/service/postjobs/job-type.service";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse, HttpStatusCode } from "axios";

interface IinitalState {
  loading: boolean;
  error: string | null;
  data: Array<{ id: number; title: string }>;
}

export const getJobTypeAsync = createAsyncThunk(
  "jobType/getJobType",
  async () => {
    try {
      const {
        status,
        data,
      }: AxiosResponse<Array<{ id: number; title: string }>> =
        await JobTypeService.getCategory();

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

export const jobTypeSlice = createSlice({
  name: "job-type",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IinitalState>) => {
    builder.addCase(
      getJobTypeAsync.fulfilled,
      (
        state,
        action: PayloadAction<Array<{ id: number; title: string }> | undefined>
      ) => {
        state.data = action.payload || []; // If payload is undefined, set an empty array
      }
    );
  },
});

export default jobTypeSlice.reducer;
