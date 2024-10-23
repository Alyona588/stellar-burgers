import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { createOrder } from '../slices/orders';
import { resetConstructor } from '../slices/builder';
import { AppDispatch, RootState } from '../store';

const middleware: Middleware =
  (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
    if (createOrder.fulfilled.match(action)) {
      store.dispatch(resetConstructor());
    }

    next(action);
  };

export default middleware;
