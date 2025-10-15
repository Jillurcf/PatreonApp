/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../src/screens/auth/Login';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../src/redux/baseApi'; // adjust path

// Mock MMKVStorage
jest.mock('react-native-mmkv-storage', () => {
  return {
    MMKVLoader: jest.fn().mockImplementation(() => ({
      initialize: jest.fn().mockReturnValue({
        setString: jest.fn(),
        getString: jest.fn(),
        removeItem: jest.fn(),
      }),
    })),
  };
});

// Mock navigation prop
const navigation = {
  navigate: jest.fn(),
  replace: jest.fn(),
  goBack: jest.fn(),
};

// Create a minimal Redux store for testing
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

it('renders Login screen correctly', () => {
  renderer.create(
    <Provider store={store}>
      <Login navigation={navigation as any} />
    </Provider>
  );
});
