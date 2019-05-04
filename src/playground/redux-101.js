import { createStore } from 'redux';

// Create store
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === 'number'
        ? action.incrementBy
        : 1;
      return { count: state.count + incrementBy };
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === 'number'
      ? action.decrementBy
      : 1;
      return { count: state.count - decrementBy };
    case 'SET':
      return { count: action.count };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
});

console.log(store.getState());

// Set up subscription
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// Action generators
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ({ count } ={}) => ({
  type: 'SET',
  count
});

const resetCount = () => ({
  type: 'RESET'
});

// Dispatch actions
store.dispatch(incrementCount({ incrementBy: 12 }));

store.dispatch(decrementCount({ decrementBy: 100 }));

store.dispatch(setCount({ count: 2353 }));

store.dispatch(resetCount());