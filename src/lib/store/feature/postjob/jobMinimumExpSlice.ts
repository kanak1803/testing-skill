import { JobMinimumExpService } from "@/service/postjobs/job-minimum-exp.service";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse, HttpStatusCode } from "axios";

// Define the structure of each experience object
interface IJobMaximumExp {
  id: number;
  title: string;
}

interface IinitalState {
  loading: boolean;
  error: string | null;
  data: IJobMaximumExp[];
}

export const getJobMinimumExpAsync = createAsyncThunk<
  IJobMaximumExp[] | undefined, // Return type
  void, // Argument type
  { rejectValue: string } // Reject type (optional)
>("jobType/getJobType", async () => {
  try {
    const {
      status,
      data,
    }: AxiosResponse<Array<{ id: number; title: string }>> =
      await JobMinimumExpService.getCategory();

    switch (status) {
      case HttpStatusCode.Ok: {
        console.log(data, "testing data");
        return data;
      }
      case HttpStatusCode.NoContent: {
        return []; // Return empty array when no content
      }
      default:
        throw new Error("Unexpected response status");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Error fetching data");
  }
});

const initialState: IinitalState = {
  error: "",
  loading: false,
  data: [],
};

export const jobMinimumExpSlice = createSlice({
  name: "job-type",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IinitalState>) => {
    builder.addCase(
      getJobMinimumExpAsync.fulfilled,
      (state, action: PayloadAction<IJobMaximumExp[] | undefined>) => {
        state.data = action.payload ?? []; // Fallback to empty array if undefined
      }
    );
  },
});

export default jobMinimumExpSlice.reducer;
