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
export const getOffers = createAsyncThunk("user/offers", async () => {
  const { data } = await LukeApp.get(`offers/wall`);
  return data.result;
});
export const getTopOffers = createAsyncThunk("user/top-offers", async () => {
  const { data } = await LukeApp.get(`/offers/top`);
  return data.result;
});
export const getPayments = createAsyncThunk("user/payments", async () => {
  const { data } = await LukeApp.get(`/payment`);
  return data.paymentWays;
});
export const getVideos = createAsyncThunk("user/videos", async () => {
  const { data } = await LukeApp.get(`/video`);
  return data.videos;
});

const initialState = {
  user: {
    _id: "",
  },
  allUsers: [],
  requests: [],
  offers: [],
  topOffers: [],
  payments: [],
  videos: [],
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
          state.requests[index] = oneUser;
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
    editOfferStatus: (state, action) => {
      const oneUser = state.offers.find(
        (value) => value._id == action.payload._id
      );
      oneUser.status = action.payload.status;
      state.offers.map((value, index) => {
        if (value._id == action.payload._id) {
          state.offers[index] = oneUser;
        }
      });
    },
    editVideoStatus: (state, action) => {
      const oneUser = state.videos.find(
        (value) => value._id == action.payload._id
      );
      oneUser.status = action.payload.status;
      state.videos.map((value, index) => {
        if (value._id == action.payload._id) {
          state.videos[index] = oneUser;
        }
      });
    },
    editAllOfferStatus: (state, action) => {
      const oneUser = state.topOffers.find(
        (value) => value._id == action.payload._id
      );
      oneUser.status = action.payload.status;
      state.topOffers.map((value, index) => {
        if (value._id == action.payload._id) {
          state.topOffers[index] = oneUser;
        }
      });
    },
    editPaymentStatus: (state, action) => {
      const oneUser = state.payments.find(
        (value) => value._id == action.payload._id
      );
      oneUser.status = action.payload.status;
      state.payments.map((value, index) => {
        if (value._id == action.payload._id) {
          state.payments[index] = oneUser;
        }
      });
    },
    addOffersWall: (state, action) => {
      state.offers.push(action.payload);
    },
    addTopOffers: (state, action) => {
      state.topOffers.push(action.payload);
    },
    editOffor: (state, action) => {
      state.offers.map((value, index) => {
        if (value._id == action.payload._id) {
          state.offers[index] = action.payload.data;
        }
      });
    },
    editPayment: (state, action) => {
      state.payments.map((value, index) => {
        if (value._id == action.payload._id) {
          state.payments[index] = action.payload.data;
        }
      });
    },
    editTopOffer: (state, action) => {
      state.topOffers.map((value, index) => {
        if (value._id == action.payload._id) {
          state.topOffers[index] = action.payload.data;
        }
      });
    }
    addPayment: (state, action) => {
      state.payments.push(action.payload);
    },
    addVideo: (state, action) => {
      console.log(action.payload);
      state.videos.push(action.payload);
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.user = { ...action.payload };
    },
    [addAllUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload;
    },
    [getRequests.fulfilled]: (state, action) => {
      state.requests = action.payload;
    },
    [getOffers.fulfilled]: (state, action) => {
      state.offers = action.payload;
    },
    [getTopOffers.fulfilled]: (state, action) => {
      state.topOffers = action.payload;
    },
    [getPayments.fulfilled]: (state, action) => {
      state.payments = action.payload;
    },
    [getVideos.fulfilled]: (state, action) => {
      state.videos = action.payload;
    },
  },
});

export const {
  editAllUsers,
  editStatus,
  editRequestStatus,
  editUserPoint,
  editOfferStatus,
  editAllOfferStatus,
  addOffersWall,
  addTopOffers,
  editPayment,
  editOffor,
  editTopOffer,
  editPaymentStatus,
  addPayment,
  editVideoStatus,
  addVideo,
} = userSlice.actions;
export default userSlice.reducer;
