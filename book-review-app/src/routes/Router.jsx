import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Profile } from "../pages/Profile";
import { New } from "../pages/New";
import { Detail } from "../pages/Detail";
import { Edit } from "../pages/Edit";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new" element={<New />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
