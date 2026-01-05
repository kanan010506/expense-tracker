function ExpensesList({expenses, onDeleteExpense}) {
  if (expenses.length === 0) {
    return <p>No expenses added yet</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Paid By</th>
          <th>Paid For</th>
          <th>Amount (₹)</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <td><strong>{expense.description}</strong></td>
            <td>{expense.paidBy}</td>
            <td>{expense.paidFor.join(', ')}</td>
            <td>₹{expense.amount}</td>
            <td><button onClick={() => onDeleteExpense(index) }>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpensesList;
