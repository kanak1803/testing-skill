import { CompanySizeService } from "@/service/registerrecruiter/registerCompanySize.Service";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";

interface IinitalState {
  loading: boolean;
  error: string | null;
  data: ICategory[];
}

export const getCompanySizesAsync = createAsyncThunk(
  "companySize/getcompanySize", // Adjusted the action name to match the action creator naming convention
  async () => {
    try {
      // @ts-expect-error The TypeScript error occurs because of the Axios response type mismatch
      const { status, data }: AxiosResponse<ICategory[]> =
        await CompanySizeService.getCompanySizes();

      switch (status) {
        case HttpStatusCode.Ok: {
          console.log(data, "testing data");
          return data;
        }
        case HttpStatusCode.NoContent: {
          return []; // Return empty array if there's no content
        }
        default: {
          throw new Error("Failed to fetch company sizes");
        }
      }
    } catch (error: unknown) {
      console.log(error);
      throw error; // Re-throw the error to be caught by rejected case in slice
    }
  }
);

const initialState: IinitalState = {
  error: "",
  loading: false,
  data: [],
};

interface ICategory {
  id: number;
  size: string;
}

export const companyCategorySlice = createSlice({
  name: "business-category",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IinitalState>) => {
    builder.addCase(
      getCompanySizesAsync.fulfilled,
      (state, action: PayloadAction<ICategory[]>) => {
        console.log(action.payload, "testing data");
        state.data = action.payload;
      }
    );
  },
});

export default companyCategorySlice.reducer;
