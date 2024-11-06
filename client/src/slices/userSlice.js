import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users: [],
  staff: [],
  loading: false,
  orignalImage: [],
  croppedImg: [],
  imageName: "",
  imageNo: null,
  files: [],
  noOfFiles: 0,
  cameraAtStart: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUserDetails: (state, action) => {
      state.user = action.payload;
    },
    setImage: (state, action) => {
      state.orignalImage = state.orignalImage.concat(action.payload);
    },
    removeImage: (state, action) => {
      state.orignalImage = state.orignalImage.filter(
        (image, i) => i !== action.payload
      );
      state.croppedImg = state.croppedImg.filter(
        (img, i) => i !== action.payload
      );
    },
    setCropped: (state, action) => {
      state.croppedImg = state.croppedImg.concat(action.payload);
    },
    removeCropped: (state) => {
      state.croppedImg = [];
    },
    setImageName: (state, action) => {
      state.imageName = action.payload;
    },
    deleteImages: (state) => {
      state.orignalImage = [];
      (state.imageName = ""), (state.croppedImg = []);
    },
    setImageNo: (state, action) => {
      state.imageNo = action.payload;
    },

    setFiles(state, action) {
      state.files = action.payload.data;
      state.numberOfFiles = action.payload.noOfFiles;
    },
    toggleCamera(state, action) {
      console.log(action);
      state.cameraAtStart = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setStaff(state, action) {
      state.staff = action.payload;
    },
  },
});

export const {
  loginUserDetails,
  setImage,
  removeImage,
  setCropped,
  removeCropped,
  setImageName,
  deleteImages,
  setImageNo,
  setFiles,
  toggleCamera,
  setUsers,
  setStaff,
} = userSlice.actions;
export default userSlice.reducer;
