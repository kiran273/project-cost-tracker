import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export const fetchOtherCosts = createAsyncThunk(
  'otherCosts/fetchOtherCosts',
  async (userId, { dispatch }) => {
    onSnapshot(collection(db, 'users', userId, 'otherCosts'), (snapshot) => {
      const otherCosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch({ type: 'otherCosts/setOtherCosts', payload: otherCosts });
    });
  }
);

export const addOtherCost = createAsyncThunk(
  'otherCosts/addOtherCost',
  async ({ userId, description, amount }, { rejectWithValue }) => {
    try {
      if (!description || amount <= 0) throw new Error('Invalid input: Description cannot be empty and amount must be positive');
      const docRef = await addDoc(collection(db, 'users', userId, 'otherCosts'), { description, amount });
      return { id: docRef.id, description, amount };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editOtherCost = createAsyncThunk(
  'otherCosts/editOtherCost',
  async ({ userId, id, description, amount }, { rejectWithValue }) => {
    try {
      if (!description || amount <= 0) throw new Error('Invalid input: Description cannot be empty and amount must be positive');
      const docRef = doc(db, 'users', userId, 'otherCosts', id);
      await updateDoc(docRef, { description, amount });
      return { id, description, amount };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOtherCost = createAsyncThunk(
  'otherCosts/deleteOtherCost',
  async ({ userId, id }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'users', userId, 'otherCosts', id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const otherCostsSlice = createSlice({
  name: 'otherCosts',
  initialState: [],
  reducers: {
    setOtherCosts(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOtherCost.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(editOtherCost.fulfilled, (state, action) => {
        const index = state.findIndex((cost) => cost.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteOtherCost.fulfilled, (state, action) => {
        return state.filter((cost) => cost.id !== action.payload);
      })
      .addCase(addOtherCost.rejected, (state, action) => {
        console.error('Add other cost failed:', action.payload);
      })
      .addCase(editOtherCost.rejected, (state, action) => {
        console.error('Edit other cost failed:', action.payload);
      })
      .addCase(deleteOtherCost.rejected, (state, action) => {
        console.error('Delete other cost failed:', action.payload);
      });
  },
});

export const { setOtherCosts } = otherCostsSlice.actions;
export default otherCostsSlice.reducer;