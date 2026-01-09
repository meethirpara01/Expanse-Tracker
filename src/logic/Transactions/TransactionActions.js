import { ValidateTransaction } from "./ValidateTransaction.js";

function addTransaction(transaction) {
    const vTransaction = ValidateTransaction(transaction);
    if (vTransaction.isValid) {
        return
        {
            success: true,
            data: updatedTransactions
        }
    }
    else {
        {
            success: false,
            error: "Something Gose Wrong"
        }

    }
}