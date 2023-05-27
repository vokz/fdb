import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

// Reducer function
const initialState = { data: {} };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

// Create Redux store
const store = configureStore({
  reducer: reducer,
  middleware: [thunk]
});

export default store;