import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

// post NCR data

export const PostNcrOptiondata = createAsyncThunk('ncroption/post',
    async (data) => {
    await axios.post('/api/createncroption',{data})
})

//Get All Ncr Data
export const GetAllNcrOptionsData = createAsyncThunk('/getncroption/get', async () => {
    const { data } = await axios.get('api/getncroption')
    console.log(data)
    return data
  })

  export const GetAllNcrOptionsData2 = createAsyncThunk('/getncroption2/get', async () => {
    const { data } = await axios.get('api/getncroption2')
    console.log(data)
    return data
  })

  const initialState = {
    data: [],
    loading: true,
    data4: [],
    loading4: true,
    // token: [],
    success: false,
    user: [],
    // isAdmin: false,
    singleData: [],
  }


  const NcrOptionSlice = createSlice({
    name: 'NcrOptionSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(GetAllNcrOptionsData.pending, (state, action) => {
        state.loading = true
      })
      .addCase(GetAllNcrOptionsData.fulfilled, (state, action) => {
        state.data.push(action.payload)
        state.loading = false
      })
      .addCase(GetAllNcrOptionsData2.pending, (state, action) => {
        state.loading4 = true
      })
      .addCase(GetAllNcrOptionsData2.fulfilled, (state, action) => {
        state.data4.push(action.payload)
        state.loading4 = false
      });
    }
  })
  
  export const NcrOptionSliceReducer = NcrOptionSlice.reducer
  
  export const NcrOptionSliceAction = NcrOptionSlice.actions