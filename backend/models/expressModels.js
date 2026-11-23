import mongoose from 'mongoose';

const expressSchema = new mongoose.Schema({
    date:{
        type: Date,
    },
    amount:{
        type: Number,
    },
    title:{
        type: String,
    },
    category:{
        type: String,
    },
});

const Expense = mongoose.model('Expense', expressSchema);
export default Expense;