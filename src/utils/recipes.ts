const { VITE_DUMMY_API_URL } = import.meta.env;

export const getRecipes = async (skip: number, limit: number) => {
  try {
    const response = await fetch(
      `${VITE_DUMMY_API_URL}/recipes?skip=${skip}&limit=${limit}`
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

export const getSearchRecipes = async (searchValue: string) => {
  try {
    const response = await fetch(
      `${VITE_DUMMY_API_URL}/recipes/search?q=${searchValue}`
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

export const getTagRecipes = async (
  tag: string,
  skip: number = 0,
  limit: number = 0
) => {
  try {
    const response = await fetch(
      `${VITE_DUMMY_API_URL}/recipes/tag/${tag}?skip=${skip}&limit=${limit}`
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

export const getRecipe = async (id: string) => {
  try {
    const response = await fetch(`${VITE_DUMMY_API_URL}/recipes/${id}`);
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

export const getMealTypeRecipes = async (type: string) => {
  try {
    const response = await fetch(
      `${VITE_DUMMY_API_URL}/recipes/meal-type/${type}`
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
