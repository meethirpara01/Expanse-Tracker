import { createContext, useContext, useEffect, useState } from "react";
import { addTransaction as addTX } from "../logic/Transactions/TransactionActions";
import { deleteTransaction as deleteTX } from "../logic/Transactions/TransactionActions";
import { updateTransaction as updateTX } from "../logic/Transactions/TransactionActions";
import { addCategory as addCat } from "../logic/categories/categoryActions";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);


    // LOAD FROM LOCAL STORAGE - TRANSACTIONS
    useEffect(() => {
        const stored = localStorage.getItem("expense_tracker_transactions");
        if (stored) {
            try {
                setTransactions(JSON.parse(stored));
            }
            catch {
                setTransactions([]);
            }
        }
    }, []);

    // SYNC WITH LOCAL STORAGE - TRANSACTIONS
    useEffect(() => {
        localStorage.setItem("expense_tracker_transactions", JSON.stringify(transactions));
    }, [transactions]);

    // LOAD FROM LOCAL STORAGE - CATEGORIES
    useEffect(() => {
        const stored = localStorage.getItem("expense_tracker_categories");
        if (stored) {
            try {
                setCategories(JSON.parse(stored));
            } catch {
                setCategories([]);
            }
        }
    }, []);

    // SYNC WITH LOCAL STORAGE - CATEGORIES
    useEffect(() => {
        localStorage.setItem("expense_tracker_categories", JSON.stringify(categories));
    }, [categories]);


    // TRANSACTIONS
    function addTransaction(input) {
        const result = addTX(transactions, input);

        if (result.success) {
            setTransactions(result.data);
        }
        return result;
    }

    function deleteTransaction(id) {
        const result = deleteTX(transactions, id);

        if (result.success) {
            setTransactions(result.data);
        }
        return result;
    }

    function updateTransaction(id, input) {
        const result = updateTX(transactions, id, input);

        if (result.success) {
            setTransactions(result.data);
        }
        return result;
    }

    // CATEGORIES
    function addCategory(input) {
        const result = addCat(categories, input);

        if (result.success) {
            setCategories(result.data)
        }

        return result;
    }

    return (
        <AppDataContext.Provider value={{ transactions, categories, addTransaction, deleteTransaction, updateTransaction, addCategory }} >
            {children}
        </AppDataContext.Provider>
    );
}


// CUSTOME HOOK - WE CAN USE LIKE THIS 
// const { transactions, addTransaction } = useAppData();
export function useAppData() {
    const context = useContext(AppDataContext);
    if (!context) {
        throw new Error("useAppData must be used inside AppDataProvider");
    }
    return context;
}