import {useState} from 'react'

function AddExpenses({people, expenses, setExpenses}){
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    paidBy: '',
    paidFor: []
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    updateFormData('amount', value);
  };

  const handlePaidForChange = (person, checked) => {
    setFormData(prev => ({
      ...prev,
      paidFor: checked
        ? [...prev.paidFor, person]
        : prev.paidFor.filter(p => p !== person)
    }));
  };

  const resetForm = () => {
    setFormData({
      description: '',
      amount: '',
      paidBy: '',
      paidFor: []
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }
    if (!formData.amount || formData.amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (!formData.paidBy) {
      alert('Please select who paid');
      return;
    }
    if (formData.paidFor.length === 0) {
      alert('Please select at least one person this expense is for');
      return;
    }

    // Add expense with timestamp
    const newExpense = {
      id: Date.now(),
      ...formData,
      amount: Number(formData.amount),
      createdAt: new Date().toISOString()
    };

    setExpenses([...expenses, newExpense]);
    resetForm();
  };

  if (people.length === 0) {
    return (
      <>
        <p>Add expenses for now</p>
        <p>Add people first</p>
      </>
    );
  }

  return (
    <>
      <p>Add expenses for now</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)} 
        />
        <input 
          type="number"
          placeholder="Enter amount" 
          value={formData.amount}
          onChange={handleAmountChange}
        /> 
        <p>Paid By:</p>
        {people.map((person) => (
          <label key={person}>
            <input 
              type="radio"
              name="paidBy"
              value={person}
              checked={formData.paidBy === person}
              onChange={() => updateFormData('paidBy', person)}
            />
            {person}
          </label>
        ))}

        <p>Paid for:</p>
        {people.map((person) => (
          <label key={person}>
            <input 
              type="checkbox"
              name="paidFor"
              value={person}
              onChange={(e) => handlePaidForChange(person, e.target.checked)}
              checked={formData.paidFor.includes(person)}
            />
            {person}
          </label>
        ))}
        <button type="submit">Add Expense</button>
      </form>
    </>
  );
}

export default AddExpenses;