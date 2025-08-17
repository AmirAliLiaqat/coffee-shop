// Product Categories Enum
export const PRODUCT_CATEGORIES = {
  HOT_DRINKS: "Hot Drinks",
  COLD_DRINKS: "Cold Drinks",
  PASTRIES: "Pastries",
  SANDWICHES: "Sandwiches",
  SNACKS: "Snacks",
};

// Array version for mongoose enum validation
export const PRODUCT_CATEGORIES_ARRAY = [
  PRODUCT_CATEGORIES.HOT_DRINKS,
  PRODUCT_CATEGORIES.COLD_DRINKS,
  PRODUCT_CATEGORIES.PASTRIES,
  PRODUCT_CATEGORIES.SANDWICHES,
  PRODUCT_CATEGORIES.SNACKS,
];

// Helper function to validate if a category is valid
export const isValidProductCategory = (category) => {
  return PRODUCT_CATEGORIES_ARRAY.includes(category);
};

// Helper function to get all categories
export const getAllProductCategories = () => {
  return PRODUCT_CATEGORIES_ARRAY;
};
