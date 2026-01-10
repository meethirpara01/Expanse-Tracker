import { useState } from "react";
import { useAppData } from "../context/AppDataContext"

const Transactions = () => {

  const { transactions, addTransaction, deleteTransaction, updateTransaction } = useAppData();

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);


  function handleSubmit(e) {
    e.preventDefault();

    const input = {
      type,
      amount: Number(amount),
      date,
      note
    };

    let result;

    if (editingId) {
      result = updateTransaction(editingId, input)
      setEditingId(null);
    }
    else {
      result = addTransaction(input);
    }

    if (!result.success) {
      setError(result.error);
      return;
    }


    setType("expense");
    setAmount("");
    setDate("");
    setNote("");
    setError(null);
  }

  function handleEdit(tx) {
    setEditingId(tx.id);
    setType(tx.type);
    setAmount(tx.amount);
    setDate(tx.date);
    setNote(tx.note || "");
  }


  return (
    <div>
      <h2>Transactions</h2>
      <form onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => { setType(e.target.value) }}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input type="number" value={amount} onChange={(e) => { setAmount(e.target.value) }} placeholder="Amount" />
        <input type="date" value={date} onChange={(e) => { setDate(e.target.value) }} />
        <input type="text" value={note} onChange={(e) => { setNote(e.target.value) }} />

        <button type="submit">
          {editingId ? "UPDATE" : "ADD"}
        </button>


        {error && <p style={{ color: "red" }}>{error}</p>}


      </form>

      <hr />

      <ul>
        {transactions.map(tx => (
            <li key={tx.id}>
              <strong>{tx.type}</strong> — ₹{tx.amount} — {tx.date}
              {tx.note && ` (${tx.note})`}
              <button onClick={() => handleEdit(tx)}>Edit</button>
              <button onClick={() => deleteTransaction(tx.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Transactions;