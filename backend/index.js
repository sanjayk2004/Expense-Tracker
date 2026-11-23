import dns from 'dns';
import express from 'express';
import Expense from './models/expressModels.js';
import connectDB from './config/db.js';

dns.setServers(['8.8.8.8', '8.8.4.4']);

connectDB();
const app = express();
app.use(express.json());
const port = 8000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/api/expenses", async (req, res) => {
    try {
        const expenses = await Expense.find({});
        res.json(expenses);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Error fetching expenses" });
    }
});

app.post("/api/expenses", async (req, res) => {
    const { title, amount, category, date } = req.body;
    try {
        await Expense.create({
            title,
            amount,
            category,
            date,
        });
        res.send("Expense created successfully");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Error creating expense");
    }
});

app.delete("/api/expenses/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        res.json(deletedExpense);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Error deleting expense" });
    }
});

app.put("/api/expenses/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const { title, amount, category, date } = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { title, amount, category, date },
            { new: true }
        );
        res.json(updatedExpense);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Error updating expense" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});