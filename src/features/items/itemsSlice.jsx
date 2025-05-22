import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (userId, { dispatch }) => {
    onSnapshot(collection(db, 'users', userId, 'items'), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch({ type: 'items/setItems', payload: items });
    });
  }
);

export const addItem = createAsyncThunk(
  'items/addItem',
  async ({ userId, name, cost }, { rejectWithValue }) => {
    try {
      if (!name || cost <= 0) throw new Error('Invalid input: Name cannot be empty and cost must be positive');
      const docRef = await addDoc(collection(db, 'users', userId, 'items'), { name, cost });
      return { id: docRef.id, name, cost };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editItem = createAsyncThunk(
  'items/editItem',
  async ({ userId, id, name, cost }, { rejectWithValue }) => {
    try {
      if (!name || cost <= 0) throw new Error('Invalid input: Name cannot be empty and cost must be positive');
      const docRef = doc(db, 'users', userId, 'items', id);
      await updateDoc(docRef, { name, cost });
      return { id, name, cost };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async ({ userId, id }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'users', userId, 'items', id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    setItems(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItem.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(editItem.fulfilled, (state, action) => {
        const index = state.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        return state.filter((item) => item.id !== action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        console.error('Add item failed:', action.payload);
      })
      .addCase(editItem.rejected, (state, action) => {
        console.error('Edit item failed:', action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        console.error('Delete item failed:', action.payload);
      });
  },
});

export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;