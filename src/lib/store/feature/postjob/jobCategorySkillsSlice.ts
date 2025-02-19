// import { JobLevelService } from "@/service/postjobs/job-level.service";
import { JobCategorySkillsService } from "@/service/postjobs/job-category-skills.service";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse, HttpStatusCode } from "axios";

interface IJobCategorySkill {
  id: number;
  title: string;
}

interface IinitalState {
  loading: boolean;
  error: string | null;
  data:  IJobCategorySkill[];
}

export const getJobCategorySkillAsync = createAsyncThunk(
  "jobCategorySkill/getJobCategorySkill",
  async (categoryId: number) => {
    try {
      const { status, data }: AxiosResponse<IJobCategorySkill[]> =
        await JobCategorySkillsService.getCategory(categoryId); // Pass categoryId to service

      switch (status) {
        case HttpStatusCode.Ok: {
          console.log(data, "testing data");
          return data;
        }
        case HttpStatusCode.NoContent: {
          return [];
        }
        default:
          return [];
      }
    } catch (error: unknown) {
      console.log(error);
      throw error; // Ensure the error is thrown properly to trigger the reject action
    }
  }
);


const initialState: IinitalState = {
  error: "",
  loading: false,
  data: [],
};

export const jobCategorySkillSlice = createSlice({
  name: "job-category-skill",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IinitalState>) => {
    builder.addCase(
      getJobCategorySkillAsync.fulfilled,
      (state, action:  PayloadAction<IJobCategorySkill[]>) => {
        console.log(action.payload, "testing data");
        state.data = action.payload;
      }
    );
  },
});

export default jobCategorySkillSlice.reducer;
