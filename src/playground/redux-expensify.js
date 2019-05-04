import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Action generators

// ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

// Reducers

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

// Apply expenses filters
const getVisisbleExpenses = (expenses, filters) => {
  return expenses.filter((expense) => {
    const dateMatch = (
      typeof filters.startDate !== 'number'
      || expense.createdAt >= filters.startDate
    ) && (
      typeof filters.endDate !== 'number'
      || expense.createdAt <= filters.endDate
    );

    const expenseDescription = expense.description.toLowerCase();
    const filterText = filters.text.toLowerCase();
    const textMatch = expenseDescription.includes(filterText);

    return dateMatch && textMatch;
  }).sort((a, b) => {
    if (filters.sortBy === 'date') {
      return a.createdAt > b.createdAt ? -1 : 1;
    } else if (filters.sortBy === 'amount') {
      return a.amount > b.amount ? -1 : 1;
    }
  });
};

// Create store
const store = createStore(combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer
}));

// Set up subscription
const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisisbleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

// Dispatch actions

const expenseOne = store.dispatch(addExpense({
  description: 'Rent',
  amount: 1000,
  createdAt: 1000
}));

const expenseTwo = store.dispatch(addExpense({
  description: 'Coffee',
  amount: 300,
  createdAt: 2000
}));

// store.dispatch(removeExpense(expenseTwo.expense));

// store.dispatch(editExpense(expenseOne.expense.id, { amount: 200 }));

// store.dispatch(setTextFilter('rent'));

// store.dispatch(sortByAmount());

store.dispatch(setStartDate(50));
store.dispatch(setEndDate(30000));
// store.dispatch(sortByAmount());

// Demo state
const demoState = {
  expenses: [{
    id: 'oiuweroipoi',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'date', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};