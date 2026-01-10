import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Categories from "../pages/Categories";
import Budgets from "../pages/Budgets";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="categories" element={<Categories />} />
        <Route path="budgets" element={<Budgets />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
