export function sortTransaction(transactions) {
    return [...transactions].sort((a, b) => {
        const dateDiff = new Date(b.date) - new Date(a.date);
        if (dateDiff !== 0) {
            return dateDiff;
        }

        return new Date(b.createdAt) - new Date(a.createdAt);
    })
}