import { useState } from "react"
import { useAppData } from "../context/AppDataContext"

const Budgets = () => {

  const { budgets, categories, setBudget } = useAppData();

  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const [totalLimit, setTotalLimit] = useState("");
  const [error, setError] = useState(null);

  const [categoryId, setCategoryId] = useState("");
  const [categoryLimit, setCategoryLimit] = useState("");


  const currentBudgets = budgets.filter(
    b => b.month === month && b.year === year
  );


  return (
    <div>
      <h2>Budgets</h2>

      <label>
        Month:
        <select value={month} onChange={e => setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </label>

      <label>
        Year:
        <input
          type="number"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
        />
      </label>

      <h3>Monthly Budget</h3>

      <form
        onSubmit={e => {
          e.preventDefault();

          const result = setBudget({
            month,
            year,
            categoryId: null,
            limit: Number(totalLimit)
          });

          if (!result.success) {
            setError(result.error);
            return;
          }

          setTotalLimit("");
          setError(null);
        }}
      >
        <input
          type="number"
          placeholder="Monthly limit"
          value={totalLimit}
          onChange={e => setTotalLimit(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>


      <h3>Category Budget</h3>

      <form
        onSubmit={e => {
          e.preventDefault();

          const result = setBudget({
            month,
            year,
            categoryId,
            limit: Number(categoryLimit)
          });

          if (!result.success) {
            setError(result.error);
            return;
          }

          setCategoryId("");
          setCategoryLimit("");
          setError(null);
        }}
      >
        <select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Category limit"
          value={categoryLimit}
          onChange={e => setCategoryLimit(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>


      <h3>Current Budgets</h3>

      {currentBudgets.length === 0 ? (
        <p>No budgets set</p>
      ) : (
        <ul>
          {currentBudgets.map(b => (
            <li key={b.id}>
              {b.categoryId === null
                ? "Total Monthly Budget"
                : categories.find(c => c.id === b.categoryId)?.name || "Deleted Category"}
              : ₹{b.limit}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Budgets