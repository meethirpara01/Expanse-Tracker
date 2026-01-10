export function createCategory({ name }) {
  return {
    id: crypto.randomUUID(),
    name,
    createdAt: new Date().toISOString(),
    isArchived: false
  };
}
