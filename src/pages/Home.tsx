import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import RecipeCard from "../components/recipes/recipeCard/RecipeCard";
import RecipeSkeleton from "../components/recipes/recipeSkeleton/RecipeSkeleton";
import "./Home.css";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);

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
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
