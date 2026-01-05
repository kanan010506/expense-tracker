import {calculatesBalance, createTransactions} from '../hooks/calculations.js';
import {useState, useEffect} from 'react';

function Settlement({people, expenses}){
  const [balances, setBalances] = useState(null);
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    if(people.length > 0 && expenses.length > 0){
      const result = calculatesBalance(people,expenses);
      setBalances(result);
      setTransactions(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people, expenses]);

  const handlesCalculatesBalance = () => {
    if (!people || people.length === 0) {
      alert('Please add people first');
      return;
    }
    if (!expenses || expenses.length === 0) {
      alert('No expenses found');
      return;
    }
    const result = calculatesBalance(people, expenses);
    setBalances(result);
    setTransactions(null); // Reset transactions when recalculating
  };

  const handlesCreateTransactions = () => {
    if (!balances) {
      alert('Please calculate balances first');
      return;
    }
    const result = createTransactions(balances);
    setTransactions(result);
  };

  if (!people || people.length === 0) {
    return <p>Add people first to see settlements</p>;
  }

  return (
    <>
      <h2>Settlement</h2>
      <p>Expenses: {expenses ? expenses.length : 0}</p>
      <p>People: {people ? people.length : 0}</p>
      
      <button 
        onClick={handlesCalculatesBalance}
      >Calculate Balance</button>
      <button
        onClick={handlesCreateTransactions}
        disabled={!balances}
      >Create Transactions</button>
      {balances ? (
        <div>
          <h3>Balances:</h3>
          {Object.keys(balances).length === 0 ? (
            <p>No balances calculated</p>
          ) : (
            <ul>
              {Object.entries(balances).map(([person, balance], index) => {
                const roundedBalance = Math.round(balance * 100) / 100;
                return (
                  <li key={index}>
                    <strong>{person}</strong>: {roundedBalance > 0 
                      ? <span style={{color: 'green'}}>+₹{roundedBalance.toFixed(2)}</span>
                      : roundedBalance < 0 
                        ? <span style={{color: 'red'}}>-₹{Math.abs(roundedBalance).toFixed(2)}</span>
                        : <span>₹{roundedBalance.toFixed(2)}</span>}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <p>Click "Calculate Balance" to see balances</p>
      )}
      {transactions && transactions.length > 0 && (
        <div>
          <h3>Transactions:</h3>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                {transaction.from} owes {transaction.to} ₹{transaction.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
      {transactions && transactions.length === 0 && (
        <p>All balances are settled! No transactions needed.</p>
      )}
    </>
  );
}

export default Settlement;