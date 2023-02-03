import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt from 'jsonwebtoken'


// post login request
export const PostLoginRequest = createAsyncThunk('Login/post', async (username, password) => {
  const { data } = await axios.post('api/login', { username, password })

  return data

})

// read user  data

export const GetAllUser = createAsyncThunk('/getuser/get', async () => {
  const { data } = await axios.get('/api/user')
  console.log(data)
  return data
})


// get single data

export const userSingle = createAsyncThunk(
  "trackwidth/getdata",
  async (id) => {
    const { data } = await axios.get(`/api/user/${id}`);
    return data;
  }
);

// Add Data
export const AddUserD = createAsyncThunk(
  "trackwidth/add",
  async (data) => {
    await axios.post("/api/register", { data });
  }
);

// Track Table update data

export const UpdateUser = createAsyncThunk(
  "trackwidth/update",
  async (data) => {
    await axios.put("/api/user", { data });
  }
);

// delete TrackWidth

export const DeleteUser = createAsyncThunk(
  "trackwidth/delete",
  async (id) => {
    await axios.put("/api/user/delete", { id });
  }
);

// search call

export const getSearch = createAsyncThunk("getsearch", async (search) => {
  const { data } = await axios.get(`/api/mearch?searchQ=${search}`);
  return data;
});

export const getSearch2 = createAsyncThunk("getsearch2", async (search) => {
  const { data } = await axios.get(`/api/mearch2?searchQ=${search}`);
  return data;
});



// initialState

const initialState = {
  data: [],
  loading: true,
  data2: [],
  loading2: true,
  token: [],
  success: false,
  user: [],
  isAdmin: false,
  singleData: [],


}

const LoginSLice = createSlice({
  name: 'LoginSLice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(PostLoginRequest.pending, (state, action) => {
      state.loading = true

    })
      .addCase(PostLoginRequest.fulfilled, (state, action) => {
        localStorage.setItem('isAdmin', action.payload.isAdmin)
        localStorage.setItem('token', action.payload.token);
        state.user = jwt.decode(action.payload.token);
        state.token = action.payload;
        state.loading = false;
        state.success = true;

      })

      .addCase(PostLoginRequest.rejected, (state, action) => {
        state.loading = false
        state.success = false
      })

      .addCase(GetAllUser.pending, (state, action) => {

        state.loading = true
      })
      .addCase(GetAllUser.fulfilled, (state, action) => {
        state.data.push(action.payload)
        state.loading = false

      })
      .addCase(userSingle.pending, (state, action) => {

        state.loading = true
      })
      .addCase(userSingle.fulfilled, (state, action) => {
        state.singleData = (action.payload)
        state.loading = false

      })
      .addCase(getSearch.pending, (state, action) => {
        state.loading = true;
        state.data = [];
      })
      .addCase(getSearch.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.searchstate = action.payload.message
        state.loading = false;
      })
      .addCase(getSearch2.pending, (state, action) => {
        state.loading2 = true;
        state.data2 = [];
      })
      .addCase(getSearch2.fulfilled, (state, action) => {
        state.data2.push(action.payload);
        state.searchstate = action.payload.message
        state.loading2 = false;
      });

  }
})

export const LoginSliceReducer = LoginSLice.reducer

export const LoginSliceAction = LoginSLice.actions

