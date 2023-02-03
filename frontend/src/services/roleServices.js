import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

// post role data

export const PostRoleData = createAsyncThunk('Role/post',
  async (data) => {
    await axios.post('/api/roledata', { data })
  })


// delete data

export const RoleDeletedata = createAsyncThunk('role/delete',
  async (id) => {
    await axios.put('/api/roledatadelete', { id })
  }
)

// read role data

export const GetAllRole = createAsyncThunk("getrole", async (search) => {
  const { data } = await axios.get(`/api/role?searchQ=${search}`);
  return data;
});

//Get all resolution owner
export const GetAllRO = createAsyncThunk("getro", async (search) => {
  const { data } = await axios.get(`/api/role/getallro?searchQ=${search}`);
  return data;
});

//Get all validator
export const GetAllValidator = createAsyncThunk("getva", async (search) => {
  const { data } = await axios.get(`/api/role/getallva?searchQ=${search}`);
  return data;
});

//Get all Approver
export const GetAllApprover = createAsyncThunk("getap", async (search) => {
  const { data } = await axios.get(`/api/role/getallap?searchQ=${search}`);
  return data;
});

// initialState

const initialState = {
  data: [],
  loading: true,
  token: [],
  data1: [],
  loading1: true,
  data2: [],
  loading2: true,
  data3: [],
  loading3: true,
  token: [],
  success: false,
  user: [],
  isAdmin: false,
  singleData: [],
}

const RoleSlice = createSlice({
  name: 'RoleSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllRole.pending, (state, action) => {
        state.loading = true;
        state.data = [];
      })
      .addCase(GetAllRole.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.searchstate = action.payload.message
        state.loading = false;
      })
      .addCase(GetAllRO.pending, (state, action) => {
        state.loading1 = true;
        state.data1 = [];
      })
      .addCase(GetAllRO.fulfilled, (state, action) => {
        state.data1.push(action.payload);
        state.searchstate = action.payload.message
        state.loading1 = false;
      })
      .addCase(GetAllValidator.pending, (state, action) => {
        state.loading2 = true;
        state.data2 = [];
      })
      .addCase(GetAllValidator.fulfilled, (state, action) => {
        state.data2.push(action.payload);
        state.searchstate = action.payload.message
        state.loading2 = false;
      }).addCase(GetAllApprover.pending, (state, action) => {
        state.loading3 = true;
        state.data3 = [];
      })
      .addCase(GetAllApprover.fulfilled, (state, action) => {
        state.data3.push(action.payload);
        state.searchstate = action.payload.message
        state.loading3 = false;
      });
  }
})

export const RoleSliceReducer = RoleSlice.reducer

export const RoleSliceAction = RoleSlice.actions