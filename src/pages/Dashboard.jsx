import { useAppData } from "../context/AppDataContext"
import { calculateBudgetUsage } from "../logic/Budgets/CalculateBudgetUsage";

const Dashboard = () => {
  const { transactions, categories, budgets } = useAppData();

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


  const usage = calculateBudgetUsage({
    transactions,
    budgets,
    month: currentMonth,
    year: currentYear
  });

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

      <h3>Monthly Budget</h3>

      {usage.total.limit === null ? (
        <p>No budget set for this month</p>
      ) : (
        <p>
          ₹{usage.total.spent} / ₹{usage.total.limit}
          {usage.total.isOver && (
            <span style={{ color: "red" }}> (Over Budget)</span>
          )}
        </p>
      )}


      <h3>Category Budgets</h3>

      {Object.keys(usage.categories).length === 0 ? (
        <p>No category budgets set</p>
      ) : (
        <ul>
          {Object.entries(usage.categories).map(
            ([categoryId, status]) => (
              <li key={categoryId}>
                {categoryMap[categoryId] || "Deleted Category"} —
                ₹{status.spent} / ₹{status.limit}
                {status.isOver && (
                  <span style={{ color: "red" }}> (Over)</span>
                )}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default Dashboard