import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import OverviewPage from "./pages/OverviewPage";
import DeviceDashboard from "./pages/DeviceDashboard";
import Schedules from "./pages/Schedules";
import Errors from "./pages/Errors";
import Devices from "./pages/Devices";
import HistoryPage from "./pages/HistoryPage";
import Details from "./pages/Details";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD LAYOUT WRAPPER */}
        <Route path="/" element={<DashboardLayout />}>

          <Route path="/overviewpage" element={<OverviewPage />} />
          <Route path="/devicedashboard" element={<DeviceDashboard />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/errors" element={<Errors />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/details" element={<Details/>} />
          <Route path="/settings" element={<Settings/>} />


        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;