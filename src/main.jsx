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
import GeographyChart from "./Pages/geographyChart/GeographyChart.jsx";
import LineChart from "./Pages/lineChart/LineChart.jsx";
import PieChart from "./Pages/pieChart/PieChart.jsx";
import BarChart from "./Pages/barChart/BarChart.jsx";
import FAQPage from "./Pages/fAQPage/FAQPage.jsx";
import Calendar from "./Pages/calendar/Calendar.jsx";
import ProfileForm from "./Pages/profileForm/ProfileForm.jsx";
import Invoices from "./Pages/invoices/Invoices.jsx";
import Contacts from "./Pages/contacts/Contacts.jsx";
import UserDetails from "./Pages/userDetails/index.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<DashboardPage />} />
      <Route path="team" element={<Team />} />
      <Route path="team/:id" element={<UserDetails />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="form" element={<ProfileForm />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="faq" element={<FAQPage />} />
      <Route path="bar" element={<BarChart />} />
      <Route path="pie" element={<PieChart />} />
      <Route path="line" element={<LineChart />} />
      <Route path="geography" element={<GeographyChart />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
