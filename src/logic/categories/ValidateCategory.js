export function validateCategory({ name }) {
  if (!name || typeof name !== "string" || name.trim() === "") {
    return {
      isValid: false,
      error: "Category name is required"
    };
  }

  return { isValid: true };
}
