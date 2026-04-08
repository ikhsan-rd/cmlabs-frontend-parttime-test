import mealdb from "./mealdb";

export const getIngredients = async () => {
  const res = await mealdb.get("/list.php?i=list");
  return res.data.meals;
};

export const filterByIngredient = async (ingredientName: string) => {
  const res = await mealdb.get(`/filter.php?i=${ingredientName}`);
  return res.data.meals;
};

export const getCategories = async () => {
  const res = await mealdb.get("/list.php?c=list");
  return res.data.meals;
};

export const filterByCategory = async (categoryName: string) => {
  const res = await mealdb.get(`/filter.php?c=${encodeURIComponent(categoryName)}`);
  return res.data.meals;
};

export const getAreas = async () => {
  const res = await mealdb.get("/list.php?a=list");
  return res.data.meals;
};

export const filterByArea = async (areaName: string) => {
  const res = await mealdb.get(`/filter.php?a=${encodeURIComponent(areaName)}`);
  return res.data.meals;
};

export const getMealDetail = async (mealId: string) => {
  const res = await mealdb.get(`/lookup.php?i=${mealId}`);
  return res.data.meals[0];
};

export const searchMeals = async (query: string) => {
  const res = await mealdb.get(`/search.php?s=${encodeURIComponent(query)}`);
  return res.data.meals || [];
};
