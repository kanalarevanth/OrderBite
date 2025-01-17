const { VITE_API_URL } = import.meta.env;

export const getRecipes = async (skip: number, limit: number) => {
  try {
    const response = await fetch(
      `${VITE_API_URL}/recipes?skip=${skip}&limit=${limit}`
    );
    const data = await response.json();

    if (data) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return null;
  }
};
