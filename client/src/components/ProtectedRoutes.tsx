import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { checkAuth } from "../features/user/userSlice";

const ProtectedRoutes = (props: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, checkAuth]);

  const auth = localStorage.getItem("verify");

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
