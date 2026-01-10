import { validateCategory } from "./ValidateCategory";
import { createCategory } from "../../core/models/category.model";

export function addCategory(categories, input) {
    const validation = validateCategory(input);

    if (!validation.isValid) {
        return {
            success: false,
            error: validation.error
        }
    }

    const newCategory = createCategory(input);

    return {
        success: true,
        data: [...categories, newCategory]
    }
}