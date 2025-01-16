import React, { useState, useEffect, useMemo } from "react";
import { Container, Row } from "react-bootstrap";
import RecipeCard from "../components/recipes/recipeCard/RecipeCard";
import RecipeSkeleton from "../components/recipes/recipeSkeleton/RecipeSkeleton";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, updateRecipeQuantity } from "../store/cartSlice";
import { Recipe } from "../types/recipe";
import { RootState } from "../store/store";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes?skip=${
          (page - 1) * itemsPerPage
        }&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setRecipes((prevRecipes) => [...prevRecipes, ...data.recipes]);
      setHasMore(data.total > recipes.length + itemsPerPage);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  const updatedRecipes = useMemo(() => {
    return recipes.map((recipe) => {
      const cartItem = cartItems.find((item) => item.id === recipe.id);
      return { ...recipe, quantity: cartItem ? cartItem.quantity : 0 };
    });
  }, [recipes, cartItems]);

  const handleIncrease = (id: number, recipeIndex: number) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe, index) => {
        if (recipe.id === id && index === recipeIndex) {
          const newQuantity = (recipe.quantity || 0) + 1;
          dispatch(addRecipe({ ...recipe, quantity: newQuantity }));
          return { ...recipe, quantity: newQuantity };
        }
        return recipe;
      })
    );
  };

  const handleDecrease = (id: number, recipeIndex: number) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe, index) => {
        if (recipe.id === id && index === recipeIndex) {
          const newQuantity = (recipe.quantity || 0) - 1;
          dispatch(
            updateRecipeQuantity({ id: recipe.id, quantity: newQuantity })
          );
          return { ...recipe, quantity: newQuantity > 0 ? newQuantity : 0 };
        }
        return recipe;
      })
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight;

      if (bottom && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading]);

  return (
    <Container className="d-flex flex-column align-items-center recipes-container">
      {loading ? (
        <Row xs={1} sm={2} md={3} lg={4} xl={6} className="skelton-row">
          {[...Array(6)].map((_, index) => (
            <RecipeSkeleton key={`${index}`} />
          ))}
        </Row>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} xl={6}>
          {updatedRecipes.map((recipe, index) => (
            <RecipeCard
              key={`${recipe.id}${index}`}
              recipeIndex={index}
              recipe={recipe}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
            />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
