export function calculateBudgetUsage({ transactions, budgets, month, year }) {

    const monthlyExpenses = transactions.filter(tx => {
        const d = new Date(tx.date);
        return (
            tx.type === "expense" && d.getMonth() === month && d.getFullYear() === year
        );
    });

    const totalSpent = monthlyExpenses.reduce((sum, tx) => sum + tx.amount, 0);

    const monthlyBudgets = budgets.find(
        b => b.month === month && b.year === year && b.categoryId === null
    );

    const totalLimit = monthlyBudgets ? monthlyBudgets.limit : null;

    const isOverTotalBudget = totalLimit !== null && totalSpent > totalLimit;

    const spentByCategory = {};
    monthlyExpenses.forEach(tx => {
        const key = tx.categoryId ?? "uncategorized";
        spentByCategory[key] = (spentByCategory[key] || 0) + tx.amount;
    });


    const categoryBudgetStatus = {};

    budgets.filter(b => b.month === month && b.year === year && b.categoryId !== null)
        .forEach(budget => {
            const spent = spentByCategory[budget.categoryId] || 0;
            categoryBudgetStatus[budget.categoryId] = {
                limit: budget.limit,
                spent,
                isOver: spent > budget.limit
            };
        });

    return {
        total: {
            spent: totalSpent,
            limit: totalLimit,
            isOver: isOverTotalBudget
        },
        categories: categoryBudgetStatus
    };
}