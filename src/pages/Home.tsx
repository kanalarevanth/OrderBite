import React, { useEffect, useState, useMemo } from "react";
import { Container, Row } from "react-bootstrap";
import RecipeCard from "../components/recipes/recipeCard/RecipeCard";
import RecipeSkeleton from "../components/recipes/recipeSkeleton/RecipeSkeleton";
import "./Home.css";
import { useSelector } from "react-redux";
import { Recipe } from "../types/type";
import { RootState } from "../store/store";
import { useLocation } from "react-router-dom";
import { getRecipes, getTagRecipes } from "../utils/recipes";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const tag = queryParams.get("tag");

  useEffect(() => {
    let isIgnore = false;

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const skip = (page - 1) * itemsPerPage;
        const limit = itemsPerPage;
        let data;

        if (tag) {
          setRecipes([]);
          data = await getTagRecipes(tag, skip, limit);
        } else {
          data = await getRecipes(skip, limit);
        }

        if (data) {
          if (!isIgnore) {
            setRecipes((prevRecipes) => [...prevRecipes, ...data.recipes]);
            setHasMore(data.total > recipes.length + itemsPerPage);
          }
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();

    return () => {
      isIgnore = true;
    };
  }, [page, tag]);

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
        <Row xs={1} sm={2} md={3} lg={3} xl={5}>
          {updatedRecipes.map((recipe, index) => (
            <RecipeCard key={`${recipe.id}${index}`} recipe={recipe} />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
