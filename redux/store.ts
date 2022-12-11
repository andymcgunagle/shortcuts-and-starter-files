import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { toastsReducer } from './toastsSlice';
import { userReducer } from './userSlice';

const rootReducer = combineReducers({
  toasts: toastsReducer,
  user: userReducer,
});

/** 
 * @description Resets the state.
 * @example dispatch({ type: 'store/reset' });
 */
function resettableRootReducer(
  state: (ReturnType<typeof rootReducer> | undefined),
  action: AnyAction
) {
  return action.type === 'store/reset' ?
    rootReducer(undefined, action) :
    rootReducer(state, action);
};

export const store = configureStore({
  reducer: resettableRootReducer,
  // devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<StoreDispatch>();
