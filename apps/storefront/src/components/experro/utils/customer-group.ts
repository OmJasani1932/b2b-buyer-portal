export function getFilteredAccessibleCategoryQuery(): string {
  let accessibleCategories: string[] = [];

  try {
    const categories = localStorage.getItem('categories');
    if (categories) {
      accessibleCategories = JSON.parse(categories);
      if (!Array.isArray(accessibleCategories)) {
        throw new Error('Invalid categories format');
      }
    }
  } catch (error) {
    accessibleCategories = [];
  }

  if (accessibleCategories.length === 0) return '';

  const queryString = `(${accessibleCategories.map((num) => `"${num}"`).join(',')})`;
  return queryString;
}
