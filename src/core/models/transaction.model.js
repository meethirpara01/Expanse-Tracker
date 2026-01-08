export function createTransaction({ type, amount, categoryId = null, date, note = "" }) {
    return {
        id: crypto.randomUUID(),
        type,
        amount,
        categoryId,
        date,
        note,
        createdAt: new Date().toISOString()
    };
}
