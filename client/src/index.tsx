import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import About from "./components/About";
import ProtectedRoutes from "./components/ProtectedRoutes";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<App />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Route>
        <Route path="/login" element={<App />}></Route>
        <Route path="*" element={<Navigate to={"/"} />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
