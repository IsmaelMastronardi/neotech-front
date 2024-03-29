import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const url = 'https://neotech-back.onrender.com/api/v1/';

export const fetchUser = createAsyncThunk('user/show', async (user) => {
  try {
    const response = await axios(`${url}users/${user.id}`);
    if (!response.status === 200) {
      NotificationManager.error('Something went wrong', 'Fail', 1250);
      throw new Error('Error registering user');
    }
    return response.data;
  } catch (error) {
    NotificationManager.error('Error loding user', 'Error');
    throw new Error(error);
  }
});

export const createGuestUser = createAsyncThunk('user/create', async () => {
  try {
    const response = await axios.post(`${url}users/create_guest_user`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

const saveUserToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.user);
    localStorage.setItem('userState', serializedState);
  } catch (error) {
    NotificationManager.error('Error saving state to local storage:');
  }
};

const initialState = {
  loading: true,
  userFetched: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userFetched = true;
      })
      .addCase(createGuestUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userFetched = true;
        saveUserToLocalStorage(state);
      });
  },
});

export default userSlice.reducer;
