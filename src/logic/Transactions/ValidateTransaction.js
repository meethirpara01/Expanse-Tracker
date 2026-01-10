export function validateTransaction({ type, amount, categoryId = null, date, note = "" }) {

    if (!type || (type !== "income" && type !== "expense"))
    {
        return {
            isValid: false,
            error: "Transection type must be income or expanse"
        }
    }
    
    if (amount === undefined || typeof amount !== "number" || amount <= 0)
    {
        return {
            isValid: false,
            error: "Amount must be number and greater than 0"
        }
    }
    
    if (!date)
    {
        return {
            isValid: false,
            error: "Date is require"
        }
    }

    const transactionDate = new Date(date);
    const today = new Date();

    if (isNaN(transactionDate.getTime()))
    {
        return {
            isValid: false,
            error: "Invalid Date Format"
        }
    }
    
    if (transactionDate > today)
    {
        return {
            isValid: false,
            error: "Date can Not be in Future"
        }
    }
    
    if (categoryId !== null && categoryId !== undefined && typeof categoryId !== "string")
    {
        return {
            isValid: false,
            error: "CategoryId is must be a string or null"
        }
    }
    
    if (note !== undefined && typeof note !== "string")
    {
        return {
            isValid: false,
            error: "Note must be a string"
        }
    }

    return {
        isValid: true,
    }
}