export function createBudget({ month, year, categoryId = null, limit })
{
    return {
        id: crypto.randomUUID(),
        month,
        year,
        categoryId,
        limit,
        createdAt: new Date().toISOString()
    };
};