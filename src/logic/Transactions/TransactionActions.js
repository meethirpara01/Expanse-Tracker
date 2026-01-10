import { validateTransaction } from "./ValidateTransaction.js";
import { createTransaction } from "../../core/models/transaction.model.js";
import { sortTransaction } from "./SortTransactions.js";

export function addTransaction(transactions, input) {
    const validation = validateTransaction(input);

    if (!validation.isValid) {
        return {
            success: false,
            error: validation.error
        }
    }

    const newTransaction = createTransaction(input);

    const updatedTransaction = [...transactions, newTransaction];

    const sortedTransaction = sortTransaction(updatedTransaction);

    return {
        success: true,
        data: sortedTransaction
    }
}

export function deleteTransaction(transactions, id) {
    const exists = transactions.some(tx => tx.id === id);

    if (!exists) {
        return {
            success: false,
            error: "Transaction not found"
        };
    }

    const updatedTransaction = transactions.filter(tx => tx.id !== id);

    return {
        success: true,
        data: updatedTransaction
    };
}

export function updateTransaction(transactions, id, updatedInput) {
    const existing = transactions.find(tx => tx.id === id);

    if (!existing) {
        return {
            success: false,
            error: "Transaction not found"
        };
    }

    const validation = validateTransaction(updatedInput);
    if (!validation.isValid) {
        return {
            success: false,
            error: validation.error
        };
    }

    const updatedTransaction = {
        ...existing,
        ...updatedInput
    };

    const updatedTransactions = transactions.map(tx =>
        tx.id === id ? updatedTransaction : tx
    );

    const sortedTransactions = sortTransaction(updatedTransactions);

    return {
        success: true,
        data: sortedTransactions
    };
}


