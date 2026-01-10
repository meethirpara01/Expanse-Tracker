import { useState } from "react";
import { useAppData } from "../context/AppDataContext"

const Categories = () => {

  const { categories, addCategory } = useAppData();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const result = addCategory({ name });

    if (!result.success) {
      setError(result.error);
      return;
    }

    setName("");
    setError(null);
  }

  return (
    <div>
      <h2>Categories</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <ul>
        {categories.map(cat => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Categories