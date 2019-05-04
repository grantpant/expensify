// Apply expenses filters
export default (expenses, filters) => {
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