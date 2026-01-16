import { validateBudget } from "./ValidateBudget";
import { createBudget } from "../../core/models/budget.model";

export function upsertBudget(budgets, input) {
    const validation = validateBudget(input);
    if (!validation.isValid) {
        return {
            success: false,
            error: validation.error
        };
    }

    const existing = budgets.find(b => 
        b.month === input.month &&
        b.year === input.year &&
        b.categoryId === input.categoryId
    )

    if (existing) {
        const updatedBudgets = budgets.map(b => 
            b.id === existing.id ? { ...b, limit: input.limit} : b
        );

        return {
            success: true,
            data: updatedBudgets
        };
    }
 
    const newBudget = createBudget(input);
    return {
        success: true,
        data: [...budgets, newBudget]
    };
};