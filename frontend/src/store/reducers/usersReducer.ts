import { createSlice } from "@reduxjs/toolkit";

import * as user from "../actions/userAction";

const userSlice = createSlice({
  name: "users",
  initialState: user.init,
  reducers: {
    resetStatusCode: user.resetStatusCode,
    setFormUser: user.setFormUser,
    handleChangeForm: user.handleChangeForm,
    resetForm: user.resetForm,
  },
  extraReducers: (builder) => {
    // get user
    builder.addCase(user.getUserByAdmin.pending, (state) => {
      state.status = "loading";
      state.data = [];
    });

    builder.addCase(user.getUserByAdmin.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
      console.log("Fetch user is success");
    });

    builder.addCase(user.getUserByAdmin.rejected, (state) => {
      console.log("Fetch user is error");
    });

    // get user by id
    builder.addCase(user.getUserById.pending, (state) => {
      state.status = "loading";
      state.data = [];
    });

    builder.addCase(user.getUserById.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
      console.log("Fetch user is success");
    });

    builder.addCase(user.getUserById.rejected, (state) => {
      console.log("Fetch user is error");
    });

    //add user
    builder.addCase(user.addUserByAdmin.fulfilled, (state, action) => {
      state.statusCode = 201;
      console.log("Add user is success.");
    });

    builder.addCase(user.addUserByAdmin.rejected, (state, action) => {
      console.log("Add user is error.");
    });

    //update user
    builder.addCase(user.updateUserByAdmin.fulfilled, (state, action) => {
      state.statusCode = 201;
      console.log("Update user is success.");
    });

    builder.addCase(user.updateUserByAdmin.rejected, (state, action) => {
      console.log("Update user is error.");
    });

    // Delete User
    builder.addCase(user.deleteUserByAdmin.fulfilled, (state, action) => {
      state.statusCode = 204;
      console.log("Delete user is success");
    });

    builder.addCase(user.deleteUserByAdmin.rejected, (state, action) => {
      console.log("Delete user is error");
    });
  },
});

export default userSlice;

export const { resetStatusCode, setFormUser, handleChangeForm, resetForm } =
  userSlice.actions;
