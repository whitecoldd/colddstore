import { publicRequest, userRequest } from "../req";
import { loginFailure, loginStart, loginSuccess, logout, registerFailure, registerStart, registerSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/api/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const logoutFunc = (dispatch) => {
  dispatch(loginStart());
  try {
    // const res = await userRequest.get("/api/auth/logout");
    dispatch(logout());
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/api/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};
export const getRedux = async (dispatch, startCommand, successCommand, failureCommand, req) => {
  dispatch(startCommand());
  try {
    const res = await publicRequest.get(`/api/${req}/find`);
    dispatch(successCommand(res.data));
  } catch (err) {
    dispatch(failureCommand());
  }
};
export const deleteRedux = async (id, dispatch, startCommand, successCommand, failureCommand, req) => {
  dispatch(startCommand());
  try {
    await userRequest.delete(`/api/${req}/${id}`);
    dispatch(successCommand(id));
  } catch (err) {
    dispatch(failureCommand());
  }
};
export const updateRedux = async (id, input, dispatch, startCommand, successCommand, failureCommand, req) => {
  dispatch(startCommand());
  try {
    const res = await userRequest.put(`/api/${req}/${id}`, input);
    dispatch(successCommand(res.data));
  } catch (err) {
    dispatch(failureCommand());
  }
};
export const addRedux = async (input, dispatch, startCommand, successCommand, failureCommand, req) => {
  dispatch(startCommand());
  try {
    const res = await userRequest.post(`/api/${req}/`, input);
    dispatch(successCommand(res.data));
  } catch (err) {
    dispatch(failureCommand());
  }
};
