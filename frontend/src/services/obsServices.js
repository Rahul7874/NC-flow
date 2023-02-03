import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

// post Observation data

export const PostObsdata = createAsyncThunk('obs/post',
    async (data) => {
    await axios.post('/api/createobs',{data})
    })

// delete data

export const ObsDataDelete = createAsyncThunk('obs/delete',
  async (id) => {
    await axios.put('/api/obsdatadelete', { id })
  }
)

// read ALL Observation Data

export const GetObsData = createAsyncThunk('/getuser/get', async () => {
  const { data } = await axios.get('/api/getobs')
  console.log(data)
  return data
})

//  Get data by id

export const GetObsByid = createAsyncThunk('getobsid',
    async (id) => { await axios.get('/api/getobs',{id}) }
)

// patch request for observation
export const UpdateObs = createAsyncThunk(
  "observation/update",
  async (data) => {
    await axios.put("/api/patchobs", { data });
  }
);


// initialState

const initialState = {
  data: [],
  loading: true,
  // token: [],
  success: false,
  user: [],
  // isAdmin: false,
  singleData: [],
}

const ObsevationSlice = createSlice({
  name: 'ObsevationSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(GetObsData.pending, (state, action) => {
      state.loading = true
    })
    .addCase(GetObsData.fulfilled, (state, action) => {
      state.data.push(action.payload)
      state.loading = false
    })
  }
})

export const ObservationSliceReducer = ObsevationSlice.reducer

export const ObserationSliceAction = ObsevationSlice.actions