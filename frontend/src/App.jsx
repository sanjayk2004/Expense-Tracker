import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ExpenseForm from './components/expenseForm';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const getExpenses = async () => {
    try {
      const response = await axios.get('/api/expenses');
      setExpenses(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      getExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowExpenseForm(true);
  };

  const handleAdd = () => {
    setEditingExpense(null);
    setShowExpenseForm(true);
  };

  const handleCancel = () => {
    setShowExpenseForm(false);
    setEditingExpense(null);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <>
      <div className="app-container">
        <header className="header">
          <h1>💸 Budgify - Expense Tracker</h1>
          <p>Your smart path to financial freedom 📈</p>

          <button className="btn" onClick={handleAdd}>
            + Add Expense
          </button>
        </header>

        {showExpenseForm && (
          <ExpenseForm
            key={editingExpense ? editingExpense._id : 'new'}
            expenseToEdit={editingExpense}
            refetchExpenses={getExpenses}
            onCancel={handleCancel}
          />
        )}

        <section className="expense-list">
          <h2>📊 Tracked Expenses</h2>

          {expenses.length === 0 ? (
            <p className="no-expenses">No expenses found.</p>
          ) : (
            <div className="expense-grid">
              {expenses.map((expense) => (
                <div className="expense-card" key={expense._id}>
                  <div className="expense-header">
                    <h3>{expense.title}</h3>
                    <div className="icon-buttons">
                      <button
                        className="icon-btn"
                        title="Edit"
                        onClick={() => handleEdit(expense)}
                      >
                        ✏️
                      </button>
                      <button
                        className="icon-btn"
                        title="Delete"
                        onClick={() => handleDelete(expense._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <p className="amount">₹{expense.amount}</p>
                  <p className="date">{new Date(expense.date).toLocaleDateString('en-IN')}</p>
                  <span className="tag">{expense.category}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default App;