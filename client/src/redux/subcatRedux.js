import { createSlice } from "@reduxjs/toolkit";

export const subCatSlice = createSlice({
  name: "subCat",
  initialState: {
    subcats: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getSubCatStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getSubCatSuccess: (state, action) => {
      state.isFetching = false;
      state.subcats = action.payload;
    },
    getSubCatFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteSubCatStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteSubCatSuccess: (state, action) => {
      state.isFetching = false;
      state.subcats.splice(
        state.subcats.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteSubCatFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateSubCatStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateSubCatSuccess: (state, action) => {
      state.isFetching = false;
      state.subcats[
        state.subcats.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.SubCat;
    },
    updateSubCatFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addSubCatStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addSubCatSuccess: (state, action) => {
      state.isFetching = false;
      state.subcats.push(action.payload);
    },
    addSubCatFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getSubCatStart,
  getSubCatSuccess,
  getSubCatFailure,
  deleteSubCatStart,
  deleteSubCatSuccess,
  deleteSubCatFailure,
  updateSubCatStart,
  updateSubCatSuccess,
  updateSubCatFailure,
  addSubCatStart,
  addSubCatSuccess,
  addSubCatFailure,
} = subCatSlice.actions;

export default subCatSlice.reducer;