import axios from "axios";
import { useHistory } from "react-router-dom";
import axiosApiInstance from "../../../helpers/axios";
const Url = process.env.REACT_APP_API_URL;

export const login = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "USER_REQUEST" });
    axios
      .post(`${Url}/api/login`, data)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.data.data });
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("id", res.data.data.id);
        localStorage.setItem("roomId", res.data.data.roomId);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        dispatch({ type: "USER_FAILURE", payload: err.response.data.message });
      });
  });
};

export const logout = (socket, history) => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("roomId");
  socket.emit("disconnected");
  history.push("/");
};

export const getProfile = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "USER_REQUEST" });
    axiosApiInstance
      .get(`${Url}/api/profile`)
      .then((res) => {
        dispatch({ type: "GET_PROFILE", payload: res.data.data });
        resolve(res);
      })
      .catch((err) => {
        dispatch({ type: "USER_FAILURE", payload: err.response.data.message });
        reject(new Error(err));
      });
  });
};

export const updateProfile = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    const id = localStorage.getItem("id");
    axiosApiInstance
      .patch(`${Url}/api/user/${id}`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
