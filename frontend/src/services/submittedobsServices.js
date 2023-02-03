import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'




export const Postobsfinaldata = createAsyncThunk('ncr/post',
    async (dataf) => {
    await axios.post('/api/finalobs',{dataf})
})





const initialState = {
    dataf: [],
    loading: true,
    // token: [],
    success: false,
    user: [],
    // isAdmin: false,
    singleData: [],
  }
  
  const obsFinalSlice = createSlice({
    name: 'obsFinalSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(Postobsfinaldata.pending, (state, action) => {
        state.loading = true
      })
      .addCase(Postobsfinaldata.fulfilled, (state, action) => {
        state.dataf.push(action.payload)
        state.loading = false
  
      })
    }
  })
  
  export const obsFinalSliceReducer = obsFinalSlice.reducer
  
  export const obsFinalSliceAction = obsFinalSlice.actions