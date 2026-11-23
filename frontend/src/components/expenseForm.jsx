import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function ExpenseForm({ refetchExpenses, onCancel, expenseToEdit }) {
    const [title, setTitle] = useState(expenseToEdit ? expenseToEdit.title : '');
    const [date, setDate] = useState(
        expenseToEdit ? new Date(expenseToEdit.date).toISOString().split('T')[0] : ''
    );
    const [amount, setAmount] = useState(expenseToEdit ? expenseToEdit.amount : '');
    const [category, setCategory] = useState(expenseToEdit ? expenseToEdit.category : 'Food');

    const submitHandler = async (e) => {
        e.preventDefault();
        const expenseData = {
            title,
            amount: Number(amount),
            date: new Date(date),
            category,
        };

        try {
            if (expenseToEdit) {
                await axios.put(`/api/expenses/${expenseToEdit._id}`, expenseData);
                alert('Expense updated successfully!');
            } else {
                await axios.post('/api/expenses', expenseData);
                alert('Expense added successfully!');
            }
            refetchExpenses();
            onCancel();
        } catch (error) {
            console.error('Error saving expense:', error);
            alert('Failed to save expense. Please try again.');
        }
    };

    return (
    <form className="expense-form" onSubmit={submitHandler}>
        <div className="new-expense__controls">
            <div className= "new-expense__control">
                <label>Title</label>
                <input type="text" placeholder="Expense Title" required value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className= "new-expense__control">
                <label>Amount</label>
                <input type="number" placeholder="Expense Amount" required value={amount} onChange={(e) => setAmount(e.target.value)}/>
            </div>
            <div className= "new-expense__control">
                <label>Date</label>
                <input type="date" placeholder="Expense Date" required value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div className= "new-expense__control">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Food">Food</option>
                    <option value="Petrol">Petrol</option>
                    <option value="EMI">EMI</option>
                </select>
            </div>
        </div>
        <div className="new-expense__actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="submit-btn">
                {expenseToEdit ? 'Update Expense' : 'Add Expense'}
            </button>
        </div>
    </form>
    )
}

export default ExpenseForm;