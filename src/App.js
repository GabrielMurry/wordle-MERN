import React from "react";
import Layout from "./components/Layout";
import Wordle from "./components/Wordle";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";

const ROLES = {
  // example of wesbite having multiple types of users. This website will only have regular 'Users'
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            {/* sends you straight to wordle. wordle will be starting path */}
            <Route path="/" element={<Wordle />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
