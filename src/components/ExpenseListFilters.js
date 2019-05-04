import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate } from '../actions/filters';

const ExpenseListFilters = (props) => (
  <div>
    <input
      type="text"
      value={props.filters.text}
      onChange={(e) => {
        props.dispatch(setTextFilter(e.target.value));
      }}
    />
    <select
      value={props.filters.sortBy}
      onChange={(e) => {
        if (e.target.value === 'amount') {
          props.dispatch(sortByAmount());
        } else if (e.target.value === 'date') {
          props.dispatch(sortByDate());
        }
      }}
    >
      <option value="amount">Amout</option>
      <option value="date">Date</option>
    </select>
  </div>
);

const mapPropsToState = (state) => ({ filters: state.filters });

export default connect(mapPropsToState)(ExpenseListFilters);