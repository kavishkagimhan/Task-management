import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(showLoading());
        const res = await axios.post(
          "http://localhost:5000/api/user/getUserData",
          { token: localStorage.getItem("token") },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (res.data.success) {
          dispatch(setUser(res.data.data));
          localStorage.setItem("user", JSON.stringify(res.data.data)); 
        } else {
          localStorage.clear();
          return <Navigate to="/login" />;
        }
      } catch (error) {
        localStorage.clear();
        dispatch(hideLoading());
        console.log(error);
      }
    };

    // Check if user exists in Redux or localStorage
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser))); 
      } else {
        getUser();
      }
    }
  }, [user, dispatch]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
