import { useAppData } from "../context/AppDataContext"

const Dashboard = () => {
  const { transactions, categories } = useAppData();

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


  const categoryMap = {};
  categories.forEach(cat => {
    categoryMap[cat.id] = cat.name;
  });

  const expenseByCategory = {};
  monthlyTransactions.filter(tx => tx.type === "expense")
    .forEach(tx => {
      const key = tx.categoryId ?? "uncategorized";
      if (!expenseByCategory[key]) {
        expenseByCategory[key] = 0;
      }
      expenseByCategory[key] += tx.amount;
    })

  return (
    <div>
      <h2>Dashboard</h2>

      <p><strong>Total Income:</strong> ₹{totalIncome}</p>
      <p><strong>Total Expense:</strong> ₹{totalExpense}</p>
      <p><strong>Balance:</strong> ₹{balance}</p>
      <p><strong>Transactions:</strong> {monthlyTransactions.length}</p>


      <h3>Expense by Category</h3>

      {Object.keys(expenseByCategory).length === 0 ? (
        <p>No expenses this month</p>
      ) : (
        <ul>
          {Object.entries(expenseByCategory).map(([categoryId, amount]) => (
            <li key={categoryId}>
              {categoryId === "uncategorized"
                ? "Uncategorized"
                : categoryMap[categoryId] || "Deleted Category"}{" "}
              — ₹{amount}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default Dashboard