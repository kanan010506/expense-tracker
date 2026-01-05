export function calculatesBalance(people, expenses){
  // Initialize balance map for all people
  const balances = {};
  people.forEach(person => {
    balances[person] = 0
  });

  // Process each expense
  expenses.forEach(expense => {
    const { amount, paidBy, paidFor } = expense;
    
    if (!paidBy || !paidFor || paidFor.length === 0) {
      console.warn('Invalid expense:', expense);
      return;
    }

    // Ensure amount is a number
    const expenseAmount = Number(amount);
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      console.warn('Invalid amount in expense:', expense);
      return;
    }

    // Check if paidBy exists in people list
    if (balances[paidBy] === undefined) {
      console.warn(`Person "${paidBy}" not found in people list`);
      return;
    }

    balances[paidBy] += expenseAmount;
    const sharePerPerson = expenseAmount / paidFor.length;

    // Each person in paidFor owes their share
    paidFor.forEach(person => {
      if (balances[person] === undefined) {
        console.warn(`Person "${person}" in paidFor not found in people list`);
        return;
      }
      balances[person] -= sharePerPerson;
    });
  });

  return balances;
}

export function createTransactions(balances){
  // Convert object to array of [person, balance] pairs
  const balanceArray = Object.entries(balances).map(([person, balance]) => ({
    person,
    balance: Math.round(balance * 100) / 100 // Round to 2 decimal places
  }));

  const transactions = [];

  // Sort by balance (negative = owes, positive = owed)
  balanceArray.sort((a, b) => a.balance - b.balance);

  let left = 0; // Pointer for people who owe (negative balance)
  let right = balanceArray.length - 1; // Pointer for people who are owed (positive balance)

  while (left < right) {
    const debtor = balanceArray[left];
    const creditor = balanceArray[right];

    // Skip if balance is already settled (within 0.01 tolerance)
    if (Math.abs(debtor.balance) < 0.01) {
      left++;
      continue;
    }
    if (Math.abs(creditor.balance) < 0.01) {
      right--;
      continue;
    }

    // Calculate transaction amount
    const amount = Math.min(Math.abs(debtor.balance), creditor.balance);
    
    // Create transaction
    transactions.push({
      from: debtor.person,
      to: creditor.person,
      amount: Math.round(amount * 100) / 100
    });

    // Update balances
    debtor.balance = Math.round((debtor.balance + amount) * 100) / 100;
    creditor.balance = Math.round((creditor.balance - amount) * 100) / 100;

    // Move pointers if balance is settled
    if (Math.abs(debtor.balance) < 0.01) {
      left++;
    }
    if (Math.abs(creditor.balance) < 0.01) {
      right--;
    }
  }

  return transactions;
}