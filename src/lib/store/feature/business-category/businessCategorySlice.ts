import { BusinessCategoryService } from "@/service/business-category/business-category.service";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosResponse, HttpStatusCode } from "axios";

interface IinitalState {
  loading: boolean;
  error: string | null;
  data: ICategory[];
}

export const getBusinessCategoryAsync = createAsyncThunk(
  "businessCategory/getBusinessCategory",
  async () => {
    try {
      const {
        status,
        data,
      }: AxiosResponse<Array<{ id: number; title: string }>> =
        await BusinessCategoryService.getCategory();

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

interface ICategory {
  id: number;
  title: string;
}

export const businessCategorySlice = createSlice({
  name: "business-category",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IinitalState>) => {
    builder.addCase(getBusinessCategoryAsync.fulfilled, (state, action) => {
      state.data = action.payload as ICategory[];
    });

    // builder.addCase(
    //   getBusinessCategoryAsync.fulfilled,
    //   (state, action: PayloadAction<ICategory[]>) => {
    //     console.log(action.payload, "testing data");
    //     state.data = action.payload;
    //   }
    // );
  },
});

export default businessCategorySlice.reducer;
