import { ManageJobInterface } from "@/inteface/manage-jobs/managejobInterface";
import { ManageJobService } from "@/service/managejobs/manage-jobs.service";
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
  data: ManageJobInterface[];
}

export const getManageJobAsync = createAsyncThunk(
  "jobType/getJobType",
  async (token: string) => {
    console.log(token + "token");
    try {
      setAuthorizationToken(token);
      const { status, data }: AxiosResponse<ManageJobInterface[]> =
        await ManageJobService.manageJob(token);

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

export const manageJobSlice = createSlice({
  name: "job-manage",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IinitalState>) => {
    builder.addCase(getManageJobAsync.fulfilled, (state, action) => {
      // Specify the correct type for action.payload (ManageJobInterface[])
      state.data = action.payload as ManageJobInterface[];
    });
  },
});

export default manageJobSlice.reducer;
