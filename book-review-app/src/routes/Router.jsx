import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Profile } from "../pages/Profile";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={NotFound} />
      </Routes>
    </BrowserRouter>
  );
};
