import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


// post NCR data

export const PostNcrdata = createAsyncThunk('ncr/post',
    async (data) => {
    await axios.post('/api/createncr',{data})
})

//Get All Ncr Data
export const GetAllNcrData = createAsyncThunk('/getncr/get', async () => {
    const { data } = await axios.get('api/getncr')
    console.log(data)
    return data
  })

  // delete data

export const NcrDataDelete = createAsyncThunk('ncr/delete',
async (id) => {
  await axios.put('/api/ncrdatadelete', { id })
}
)

// patch request for Ncr
export const UpdateNcr = createAsyncThunk(
  "ncr/update",
  async (data) => {
    await axios.put("/api/updatencr", { data });
  }
);

const initialState = {
    data: [],
    loading: true,
    // token: [],
    success: false,
    user: [],
    // isAdmin: false,
    singleData: [],
  }
  
  const NcrSlice = createSlice({
    name: 'NcrSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(GetAllNcrData.pending, (state, action) => {
        state.loading = true
      })
      .addCase(GetAllNcrData.fulfilled, (state, action) => {
        state.data.push(action.payload)
        state.loading = false
  
      })
    }
  })
  
  export const NcrSliceReducer = NcrSlice.reducer
  
  export const NcrSliceAction = NcrSlice.actions