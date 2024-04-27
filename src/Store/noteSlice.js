import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    {
      id: 1,
      date: new Date().getTime(),
      title: "sample title",
      text: "sample text",
    },
  ],
};

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
});

export default noteSlice.reducer;
