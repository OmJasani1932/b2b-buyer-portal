export function getFilteredAccessibleCategoryQuery(): string {
  const groupSize = 1000;
  let accessibleCategories: string[] = [];

  try {
    const categories = localStorage.getItem('categories');
    if (categories) {
      accessibleCategories = JSON.parse(categories);
      if (!Array.isArray(accessibleCategories)) {
        accessibleCategories = [];
      }
    }
  } catch (error) {
    console.error('Error parsing categories from localStorage:', error);
    accessibleCategories = [];
  }

  if (accessibleCategories.length === 0) {
    return '';
  }

  const groups = [];
  for (let i = 0; i < accessibleCategories.length; i += groupSize) {
    const group = accessibleCategories.slice(i, i + groupSize);
    groups.push(`provider_categories_id_esai:(${group.map((num) => `"${num}"`).join(',')})`);
  }
  return `(${groups.join(' OR ')})`;
}
