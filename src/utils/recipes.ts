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
  skip: number,
  limit: number
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
