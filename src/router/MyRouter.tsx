import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../component/Navbar";
import Tasks from "../pages/tasks";
import User from "../pages/user";
import Register from "../pages/register";
import { Provider } from "react-redux";
import store from "../store/store";

const MyRouter: React.FC = () => {
  return (
    <div>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="user" element={<User />} />
          <Route path="tasks/:userId" element={<Tasks />} />
        </Routes>
      </Provider>
    </div>
  );
};

export default MyRouter;
