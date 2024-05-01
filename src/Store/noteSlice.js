import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const nameItemStorage = "notes";

export const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
  return (await getData()) || [];
});

export const addNote = createAsyncThunk("note/addNote", async (note) => {
  note.id = Date.now();
  note.date = note.id;
  const notes = await getData();
  notes.push(note);
  await storeData(notes);

  return notes;
});

export const deleteNote = createAsyncThunk("note/deleteNote", async (id) => {
  const notes = await getData();
  const index = getIndexByID(notes, id);
  notes.splice(index, 1);
  await storeData(notes);

  return notes;
});

export const editNote = createAsyncThunk("note/editNote", async (note) => {
  const notes = await getData();
  const index = getIndexByID(notes, note.id);
  notes[index] = note;
  await storeData(notes);

  return notes;
});

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.notes = [];
    });
    builder.addCase(fetchNotes.fulfilled, (state, { payload }) => {
      state.notes = payload;
    });
    builder.addCase(fetchNotes.rejected, (state) => {
      state.notes = [];
    });

    builder.addCase(addNote.pending, (state) => {
      state.notes = [];
    });
    builder.addCase(addNote.fulfilled, (state, { payload }) => {
      state.notes = payload;
    });
    builder.addCase(addNote.rejected, (state) => {
      state.notes = [];
    });

    builder.addCase(deleteNote.pending, (state) => {
      state.notes = [];
    });
    builder.addCase(deleteNote.fulfilled, (state, { payload }) => {
      state.notes = payload;
    });
    builder.addCase(deleteNote.rejected, (state) => {
      state.notes = [];
    });

    builder.addCase(editNote.pending, (state) => {
      state.notes = [];
    });
    builder.addCase(editNote.fulfilled, (state, { payload }) => {
      state.notes = payload;
    });
    builder.addCase(editNote.rejected, (state) => {
      state.notes = [];
    });
  },
});

async function storeData(notes) {
  try {
    const json = JSON.stringify(notes);
    await AsyncStorage.setItem(nameItemStorage, json);
  } catch (error) {
    console.error("ERROR: " + error);
    throw new Error("ERROR: " + error);
  }
}

async function getData() {
  try {
    const json = await AsyncStorage.getItem(nameItemStorage);
    return JSON.parse(json) || [];
  } catch (error) {
    console.error("ERROR: " + error);
    throw new Error("ERROR: " + error);
  }
}

function getIndexByID(notes, id) {
  const index = notes.findIndex((n) => n.id === id);
  if (index < 0) {
    throw new Error("Element not found");
  }
  return index;
}

export default noteSlice.reducer;
