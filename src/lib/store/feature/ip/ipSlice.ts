import { ELocalStorage } from "@/enum/localStorage/localStorage.enum";
import { IIp } from "@/inteface/ip/ipInterface";
import { IpService } from "@/service/ip/ipService";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse, HttpStatusCode } from "axios";

interface IinitialState {
    loading: boolean
}

export const getIpApiAsync = createAsyncThunk('ip/getIpApi', async () => {
    try {
        const { status, data }: AxiosResponse<IIp> = await IpService.getIpApi();
        if(status === HttpStatusCode.Ok) return data
    }
    catch(error: unknown) {
        console.log(error, 'testing data')
    }
})

export const postIpAsync = createAsyncThunk('ip/postIp', async (ip: IIp) => {
    try {
        const { status, data } = await IpService.postIp(ip)
        switch(status) {
            case HttpStatusCode.Ok: {
                return data
            }
            case HttpStatusCode.Created: {
                return data
            }
        }
    }
    catch(error) {
        console.log(error)
    }
})

const initialState: IinitialState = {
    loading: true
}

export const ipSlice = createSlice({
    name: 'ip',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<IinitialState>) => {
        builder.addCase(postIpAsync.fulfilled, (_, action: PayloadAction<{ id: string, message: string }>) => {
            localStorage.setItem(ELocalStorage.IpId, action.payload.id)
        })
    },
    
})

export default ipSlice.reducer