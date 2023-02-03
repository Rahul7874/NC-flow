import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

// read Task data

export const getAllTask = createAsyncThunk("getAllTask", async (search) => {
    const { data } = await axios.get(`/api/getalltask?searchQ=${search}`);
    return data;
  });

//Read Single Data

export const getSingleTask = createAsyncThunk(
  "task/getSingleTask",
  async (id) => {
    const { data } = await axios.get(`/api/task/${id}`);
    return data;
  }
);

export const PostNcrfinaldata = createAsyncThunk('ncr/post',
    async (data) => {
    await axios.post('/api/finalncrsubmit',{data})
})

// initialState

const initialState = {
  data: [],
  loading: true,
  success: false,
  singleData: [],
}

const TaskSlice = createSlice({
  name: 'TaskSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getSingleTask.pending, (state, action) => {
      state.loading = true
    })
    .addCase(getSingleTask.fulfilled, (state, action) => {
      state.singleData = (action.payload)
      state.loading = false

    })
      .addCase(getAllTask.pending, (state, action) => {
        state.loading = true;
        state.data = [];
      })
      .addCase(getAllTask.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.searchstate = action.payload.message
        state.loading = false;
      });
      
  }
})

export const TaskSliceReducer = TaskSlice.reducer

export const TaskSliceAction = TaskSlice.actions