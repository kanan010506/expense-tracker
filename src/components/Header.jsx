import { useState } from 'react';
import AddPerson from './AddPerson';
import PeopleList from './PeopleList';
import AddExpenses from './AddExpenses';
import Settlement from './Settlement';
import ExpensesList from './ExpensesList';
import useLocalStorage from '../hooks/useLocalStorage.js';

function Header() {
  const [activeTab, setActiveTab] = useState('people');
  const [people, setPeople] = useLocalStorage('people', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  const tabs = [
    { id: 'people', name: '👥 People', icon: '👥' },
    { id: 'expenses', name: '💸 Add Expenses', icon: '💸' },
    { id: 'table', name: '📊 Expenses List', icon: '📊' },
    { id: 'transactions', name: '💰 Settlement', icon: '💰' }
  ];

  const removePerson = (indexToRemove) => {
    setPeople(people.filter((_, index) => index !== indexToRemove));
  };

  const handleDeleteExpense = (indexToDelete) => {
    setExpenses(expenses.filter((_, index) => index !== indexToDelete));
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="header-expense-tracker">
        <div className="header-wrapper">
          {/* Logo */}
          <div className="header-logo">
            <h1>ExpenseTracker App</h1>
          </div>

          {/* Tabs Navigation */}
          <nav className="header-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="nav-icon">{tab.icon}</span>
                <span className="nav-label">{tab.name}</span>
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="header-right">
            <div className="header-info">
              <p className="info-label">Total Expenses</p>
              <p className="info-value">₹{expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}</p>
            </div>
            <div className="header-info">
              <p className="info-label">Total People</p>
              <p className="info-value">{people.length}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ===== CONTENT AREA ===== */}
      <main className="main-content">
        {activeTab === 'people' && (
          <div className="content-section">
            <AddPerson people={people} onAddPerson={setPeople} />
            <PeopleList people={people} onRemovePerson={removePerson} />
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="content-section">
            <AddExpenses people={people} expenses={expenses} setExpenses={setExpenses} />
          </div>
        )}

        {activeTab === 'table' && (
          <div className="content-section">
            <ExpensesList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="content-section">
            <Settlement people={people} expenses={expenses} />
          </div>
        )}
      </main>
    </>
  );
}

export default Header;