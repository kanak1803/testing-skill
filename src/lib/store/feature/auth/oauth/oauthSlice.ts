import { OauthService } from "@/service/auth/oauth.service";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const postOAuthGoogleAuthAsync = createAsyncThunk(
    'oauth/postOAuthGoogleAuth',
    async (body: { ip_id: number, id_token: string }) => {
        try {
            const {  data } = await OauthService.googleAuth(body)
            console.log(data)
        }
        catch(error: unknown) {
            if(error instanceof Error) {
                console.log(error)   
            }
        }


    }    
)

interface IInitialState {
    loading: boolean;
    data: unknown;
    error: string | null;
    redirect: string | null;
  }

const initialState: IInitialState = {
    loading: false,
    data: null,
    redirect: null,
    error: "",
  };

export const OauthSlice = createSlice({
    name: 'oauth',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<IInitialState>) => {
        builder.addCase(
            postOAuthGoogleAuthAsync.fulfilled, (state, action: PayloadAction<unknown>) => {
                state.data = action.payload;
            }
        )
    }
})