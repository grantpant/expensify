import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

const ExpenseList = (props) => {
  console.log(props.expenses)
  return (
    <div>
      <h1>Expense List</h1>
      {
        props.expenses.map((expense) => (
          <ExpenseListItem
            key={expense.id}
            {...expense}
          />
        ))
      }
    </div>
  );
};

// Using connect to get data from the store

// The mapStateToProps function returns an object where we
// can specify what pieces of state we want access to.
const mapStateToProps = (state) => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

// connect returns our new component that has access to the
// Redux store, and we make that component our default export.
export default connect(mapStateToProps)(ExpenseList);
// Now our component has access to the data we specified via props.