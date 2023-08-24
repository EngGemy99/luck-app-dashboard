import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Team from "./Pages/team/Team.jsx";
import DashboardPage from "./Pages/dashboard/DashboardPage.jsx";
import UserDetails from "./Pages/userDetails/index.jsx";
import Profile from "./Pages/Profile/index.jsx";
import Login from "./Pages/Login/index.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import OffersWall from "./Pages/OffersWall/index.jsx";
import TopOffers from "./Pages/TopOffers/index.jsx";
import Requests from "./Pages/Requests/index.jsx";
import Payments from "./Pages/Payments/index.jsx";
import TabJoy from "./Pages/tabjoy/index.jsx";
import IrounSource from "./Pages/irounSource/index.jsx";
import Wannds from "./Pages/wannds/index.jsx";
import Video from "./Pages/Video/index.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import Edit_Offers from "./Pages/OffersWall/Edit_Offers.jsx";
import Edit_Top_Offers from "./Pages/TopOffers/Edit_Top_Offers.jsx";
import Edit_Payments from "./Pages/Payments/Edit_Payments.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="team"
        element={
          <PrivateRoute>
            <Team />
          </PrivateRoute>
        }
      />
      <Route
        path="team/:id"
        element={
          <PrivateRoute>
            <UserDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route
        path="offers-wall"
        element={
          <PrivateRoute>
            <OffersWall />
          </PrivateRoute>
        }
      />
      <Route
        path="requests"
        element={
          <PrivateRoute>
            <Requests />
          </PrivateRoute>
        }
      />
      <Route
        path="top-offers"
        element={
          <PrivateRoute>
            <TopOffers />
          </PrivateRoute>
        }
      />
      <Route
        path="video"
        element={
          <PrivateRoute>
            <Video />
          </PrivateRoute>
        }
      />
      <Route
        path="payment"
        element={
          <PrivateRoute>
            <Payments />
          </PrivateRoute>
        }
      />
      <Route
        path="tab-joy"
        element={
          <PrivateRoute>
            <TabJoy />
          </PrivateRoute>
        }
      />
      <Route
        path="iroun-source"
        element={
          <PrivateRoute>
            <IrounSource />
          </PrivateRoute>
        }
      />
      <Route
        path="wannds"
        element={
          <PrivateRoute>
            <Wannds />
          </PrivateRoute>
        }
      />
      <Route
        path="edit-offers-top/:id"
        element={
          <PrivateRoute>
            <Edit_Top_Offers />
          </PrivateRoute>
        }
      />
      <Route
        path="edit-offers/:id"
        element={
          <PrivateRoute>
            <Edit_Offers />
          </PrivateRoute>
        }
      />
      <Route
        path="edit-payments/:id"
        element={
          <PrivateRoute>
            <Edit_Payments />
          </PrivateRoute>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
