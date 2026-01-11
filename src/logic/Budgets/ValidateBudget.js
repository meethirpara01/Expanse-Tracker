export function validateBudget({ month, year, categoryId, limit }) {
    if (typeof limit !== "number" || limit <= 0) {
        return {
            isValid: false,
            error: "Budget limit must be greater than 0"
        };
    }

    if (month < 0 || month > 11) {
        return {
            isValid: false,
            error: "Invalid month"
        };
    }

    if (typeof year !== "number") {
        return {
            isValid: false,
            error: "Invalid year"
        };
    }

    if (categoryId !== null && typeof categoryId !== "string") {
        return {
            isValid: false,
            error: "Invalid category"
        };
    }

    return { isValid: true };
}
