import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LukeApp from "../../Api/config";

export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const { data } = await LukeApp.get(`user/${userId}`);
  return data.user;
});
export const addAllUsers = createAsyncThunk("user/addAllUsers", async () => {
  const { data } = await LukeApp.get(`admin`);
  return data.users;
});
export const getRequests = createAsyncThunk("user/Requests", async () => {
  const { data } = await LukeApp.get(`request`);
  return data.requests;
});

const initialState = {
  user: {
    _id: "",
  },
  allUsers: [],
  requests: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editAllUsers: (state, action) => {
      state.allUsers = state.allUsers.filter(
        (value) => value._id != action.payload
      );
      console.log(state.allUsers);
    },
    editStatus: (state, action) => {
      const oneUser = state.allUsers.find(
        (value) => value._id == action.payload
      );
      if (oneUser.status == "active") {
        oneUser.status = "block";
      } else {
        oneUser.status = "active";
      }
      state.allUsers.map((value, index) => {
        if (value._id == action.payload) {
          state.allUsers[index] = oneUser;
        }
      });
    },
    editRequestStatus: (state, action) => {
      const oneUser = state.requests.find(
        (value) => value._id == action.payload._id
      );
      oneUser.status = action.payload.status;
      state.allUsers.map((value, index) => {
        if (value._id == action.payload._id) {
          state.allUsers[index] = oneUser;
        }
      });
    },
    editUserPoint: (state, action) => {
      const { id, point } = action.payload;
      const oneUser = state.allUsers.find((value) => value._id == id);
      oneUser.points += +point;
      state.allUsers.map((value, index) => {
        if (value._id == id) {
          state.allUsers[index] = oneUser;
        }
      });
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = { ...action.payload };
    },
    [addAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.allUsers = action.payload;
    },
    [getRequests.fulfilled]: (state, action) => {
      state.loading = false;
      state.requests = action.payload;
    },
  },
});

export const { editAllUsers, editStatus, editRequestStatus, editUserPoint } =
  userSlice.actions;
export default userSlice.reducer;
