import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LukeApp from "../../Api/config";


export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const { data } = await LukeApp.get(`user/${userId}`);
  return data.user;
});

// export const addFavorite = createAsyncThunk(
//   "user/addFavorite",
//   async ({ userId, location }) => {
//     await Roomster.post(`user/${userId}/favourites`, {
//       apartmentId: location._id,
//     });
//     return location;
//   }
// );
// export const deleteFavorite = createAsyncThunk(
//   "user/deleteFavorite",
//   async ({ userId, location }) => {
//     const res = await Roomster.put(`user/${userId}/favourites`, {
//       apartmentId: location._id,
//     });
//     return location;
//   }
// );

const initialState = {
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: { country: "", city: "" },
    image: {
      url: "",
      publicId: "",
    },
    favourites: [],
    rentedApartments: [],
  },
  loading: false,
  error: null,
  Allusers:[]
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addAllUsers: (state, action) => {
      state.Allusers =  action.payload ;
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = { ...action.payload };
    },

  },
});

export const {
  addInfo,

  addAllUsers
} = userSlice.actions;
export default userSlice.reducer;
