import React, { useEffect, useState, useMemo } from "react";
import { Container, Row } from "react-bootstrap";
import RecipeCard from "../components/recipes/recipeCard/RecipeCard";
import RecipeSkeleton from "../components/recipes/recipeSkeleton/RecipeSkeleton";
import "./Home.css";
import { useSelector } from "react-redux";
import { Recipe } from "../types/recipe";
import { RootState } from "../store/store";
import { getRecipes } from "../utils/recipes";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const skip = (page - 1) * itemsPerPage;
        const limit = itemsPerPage;
        const data = await getRecipes(skip, limit);
        if (data) {
          setRecipes((prevRecipes) => [...prevRecipes, ...data.recipes]);
          setHasMore(data.total > recipes.length + itemsPerPage);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page]);

  const updatedRecipes = useMemo(() => {
    return recipes.map((recipe) => {
      const cartItem = cartItems.find((item) => item.id === recipe.id);
      return { ...recipe, quantity: cartItem ? cartItem.quantity : 0 };
    });
  }, [recipes, cartItems]);

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
    <Container className="d-flex flex-column align-items-center home-recipes-container">
      {loading ? (
        <Row xs={1} sm={2} md={3} lg={4} xl={6} className="home-skelton-row">
          {[...Array(6)].map((_, index) => (
            <RecipeSkeleton key={`${index}`} />
          ))}
        </Row>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} xl={6}>
          {updatedRecipes.map((recipe, index) => (
            <RecipeCard key={`${recipe.id}${index}`} recipe={recipe} />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
