import { SettingsProfileService } from "@/service/settings/job-settings-profile.service";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse, HttpStatusCode } from "axios";
import { setAuthorizationToken } from "@/lib/axiosInstance";
import { RecruiterProfile } from "@/inteface/settings/settingprofileInterface";

interface IinitalState {
  loading: boolean;
  error: string | null;
  data: RecruiterProfile | null;
}

// Adjust the async thunk to return either RecruiterProfile or undefined
export const getProfileSettingAsync = createAsyncThunk<
  RecruiterProfile | undefined, // return type
  { token: string } // parameter type
>("jobType/getJobType", async ({ token }: { token: string }) => {
  console.log(`${token} token`);
  try {
    setAuthorizationToken(token);
    const { status, data }: AxiosResponse<RecruiterProfile> =
      await SettingsProfileService.getProfile(token);

    switch (status) {
      case HttpStatusCode.Ok: {
        console.log(data, "Fetched Profile Successfully");
        return data; // Return the fetched profile data
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
    return undefined; // Return undefined in case of an error
  }
});

const initialState: IinitalState = {
  error: "",
  loading: false,
  data: null,
};

export const getProfileSettingSlice = createSlice({
  name: "profile-settings",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IinitalState>) => {
    builder.addCase(
      getProfileSettingAsync.fulfilled,
      (state, action: PayloadAction<RecruiterProfile | undefined>) => {
        console.log(action.payload, "Received Profile Data");
        state.data = action.payload || null; // Set to null if undefined
      }
    );
  },
});

export default getProfileSettingSlice.reducer;
