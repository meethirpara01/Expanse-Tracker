import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const today = new Date().toLocaleDateString();

    return (
        <aside
            style={{
                width: "220px",
                background: "#eaeaeaff",
                color: "#111",
                padding: "20px"
            }}
        >
            <h2>Expense Pro</h2>

            <nav style={{ marginTop: "30px" }}>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="/transactions">Transactions</NavLink></li>
                    <li><NavLink to="/categories">Categories</NavLink></li>
                    <li><NavLink to="/budgets">Budgets</NavLink></li>
                </ul>
            </nav>

            <div style={{ marginTop: "auto", fontSize: "14px" }}>
                <p>{today}</p>
                <p>⚙ Settings</p>
            </div>
        </aside>
    );
};

export default Sidebar;
