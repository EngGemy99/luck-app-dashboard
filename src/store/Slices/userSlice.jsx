import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LukeApp from "../../Api/config";


export const fetchUser = createAsyncThunk("user/profile", async () => {
  const { data } = await LukeApp.get(`user/profile`);
  console.log(data)
  return data;
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
  socket: null,
  unseen: [],
  notificationsNo: null,
  onlineUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
 
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = { ...action.payload };
    },
    // [addFavorite.fulfilled]: (state, action) => {
    //   state.user.favourites.push(action.payload);
    //   toastMessage("success", "Added Successfully 👏");
    // },

    // [deleteFavorite.fulfilled]: (state, action) => {
    //   var index = state.user.favourites.findIndex(function (item) {
    //     return item._id === action.payload._id;
    //   });
    //   state.user.favourites.splice(index, 1);
    //   // toastMessage("success", "Delete Successfully 👏");
    // },
  },
});

// export const {
//   addInfo,
//   // ResetRedux,
//   // setSocket,
//   // setUnseen,
//   // addUnseen,
//   // removeUnseen,
//   // resetUnseen,
//   // addOnlineUser,
//   // setUserProfileImage,
//   // setNotificationsNo,
//   // addNotificationsNo,
//   // resetNotificationsNo,
// } = userSlice.actions;
export default userSlice.reducer;
