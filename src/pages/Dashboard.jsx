import { useAppData } from "../context/AppDataContext"

const Dashboard = () => {
  const { transactions } = useAppData();

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);

    return (
      txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
    );
  });

  const totalIncome = monthlyTransactions.filter(tx => tx.type === "income")
  .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = monthlyTransactions.filter(tx => tx.type === "expense")
  .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h2>Dashboard</h2>

      <p><strong>Total Income:</strong> ₹{totalIncome}</p>
      <p><strong>Total Expense:</strong> ₹{totalExpense}</p>
      <p><strong>Balance:</strong> ₹{balance}</p>
      <p><strong>Transactions:</strong> {monthlyTransactions.length}</p>
    </div>
  );
};

export default Dashboard