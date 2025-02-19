import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse, HttpStatusCode } from "axios";
import { setAuthorizationToken } from "@/lib/axiosInstance";
import { SettingsCompanyInterface } from "@/inteface/settings/settingcompanyInterface";
import { SettingsCompanyService } from "@/service/settings/job-settings-company.service";

interface IinitalState {
  loading: boolean;
  error: string | null;
  data: SettingsCompanyInterface | null;
}

// Adjust the async thunk to return either SettingsCompanyInterface or undefined
export const getCompanySettingAsync = createAsyncThunk<
  SettingsCompanyInterface | undefined, // return type
  string // parameter type
>("jobType/getJobType", async (token: string) => {
  console.log(`${token} token`);
  try {
    setAuthorizationToken(token);
    const { status, data }: AxiosResponse<SettingsCompanyInterface> =
      await SettingsCompanyService.getCompany(token);

    switch (status) {
      case HttpStatusCode.Ok: {
        console.log(data, "Fetched Job Successfully");
        return data; // Return data as expected
      }
      case HttpStatusCode.NoContent: {
        return undefined; // Return undefined for no content
      }
      default: {
        throw new Error("Unexpected response status");
      }
    }
  } catch (error: unknown) {
    console.log(error);
    return undefined; // Return undefined if an error occurs
  }
});

const initialState: IinitalState = {
  error: "",
  loading: false,
  data: null,
};

export const getCompanySettingSlice = createSlice({
  name: "company-settings",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IinitalState>) => {
    builder.addCase(
      getCompanySettingAsync.fulfilled,
      (state, action: PayloadAction<SettingsCompanyInterface | undefined>) => {
        state.data = action.payload || null; // Set to null if undefined
      }
    );
  },
});

export default getCompanySettingSlice.reducer;
