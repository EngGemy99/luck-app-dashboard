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
    editAllUsers: (state, action) => {
      state.Allusers= state.Allusers.filter(value=>value._id != action.payload)
      console.log(state.Allusers)
    },
    editStatus: (state, action) => {
      // state.Allusers= 
      // if()
      const oneUser=state.Allusers.find(value=>value._id == action.payload)
      if (oneUser.status =="active")
      {
        oneUser.status="block"
      }else{
        oneUser.status="active"

      }
      state.Allusers.map((value,index)=>{
        if(value._id == action.payload)
        {
          state.Allusers[index]=oneUser
        }
      })
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = { ...action.payload };
    },
    [addAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.Allusers =  action.payload ;
    },

  },
});

export const {
  // addInfo,
  editAllUsers,
  editStatus
} = userSlice.actions;
export default userSlice.reducer;
