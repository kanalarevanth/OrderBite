import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, updateRecipeQuantity } from "../store/cartSlice";
import { Recipe } from "../types/type";
import { RootState } from "../store/store";
import { getRecipe, getMealTypeRecipes } from "../utils/recipes";
import RecipeCard from "../components/recipes/recipeCard/RecipeCard";
import "./RecipeDetails.css";

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
  const dispatch = useDispatch();
  const scrollToTopRef = useRef<HTMLDivElement | null>(null);

  const cartRecipe = useSelector((state: RootState) =>
    state.cart.items.find((r) => r.id === Number(id))
  );

  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    let isIgnore = false;

    const fetchRecipe = async () => {
      const response = await getRecipe(id?.toString());
      if (response && !isIgnore) {
        setRecipe(response);
      }
    };

    fetchRecipe();
    return () => {
      isIgnore = true;
    };
  }, [id]);

  useEffect(() => {
    const fetchRelatedRecipes = async () => {
      if (recipe) {
        const tags = recipe.mealType;
        const relatedRecipesPromises = tags.map((tag) =>
          getMealTypeRecipes(tag)
        );
        const relatedResponses = await Promise.all(relatedRecipesPromises);
        const allRelatedRecipes = relatedResponses.flatMap(
          (response) => response.recipes
        );
        const uniqueRelatedRecipes = allRelatedRecipes
          .filter(
            (rec, index, self) =>
              index === self.findIndex((r) => r.id === rec.id)
          )
          .filter((rec) => rec.id.toString() !== id?.toString());

        setRelatedRecipes(uniqueRelatedRecipes);
      }
    };

    fetchRelatedRecipes();
  }, [recipe, id]);

  const updatedRecipes = useMemo(() => {
    return relatedRecipes.map((recipe) => {
      const cartItem = cartItems.find((item) => item.id === recipe.id);
      return { ...recipe, quantity: cartItem ? cartItem.quantity : 0 };
    });
  }, [relatedRecipes, cartItems]);

  const handleIncrease = () => {
    if (recipe) {
      if (cartRecipe) {
        dispatch(
          updateRecipeQuantity({
            id: recipe.id,
            quantity: (cartRecipe.quantity || 0) + 1,
          })
        );
      } else {
        dispatch(addRecipe({ ...recipe, quantity: 1 }));
      }
    }
  };

  const handleDecrease = () => {
    if (recipe && cartRecipe?.quantity && cartRecipe.quantity > 0) {
      dispatch(
        updateRecipeQuantity({
          id: recipe.id,
          quantity: cartRecipe.quantity - 1,
        })
      );
    }
  };

  const handleAddToCart = () => {
    if (recipe) {
      if (!cartRecipe) {
        dispatch(addRecipe({ ...recipe, quantity: 1 }));
      }
    }
  };

  const handleRelatedRecipeClick = () => {
    if (scrollToTopRef.current) {
      scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(filledStars)].map((_, index) => (
          <span key={`filled-${index}`} className="star filled">
            ★
          </span>
        ))}
        {halfStar && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="star empty">
            ★
          </span>
        ))}
      </>
    );
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="recipe-details-box" ref={scrollToTopRef}>
        <div className="recipe-details-left">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="recipe-details-img"
          />
        </div>

        <div className="recipe-details-right">
          <div className="recipe-info">
            <h2 className="recipe-name">{recipe.name}</h2>
            <p className="recipe-ingredients">
              <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
            </p>
            <p className="recipe-cuisine">
              <strong>Cuisine:</strong> {recipe.cuisine}
            </p>
          </div>
          <div className="recipe-details-ratings-container">
            <span className="recipe-details-rating-text">Ratings:</span>
            {renderStars(recipe.rating)}
          </div>

          <div className="recipe-card-bottom-content">
            {cartRecipe ? (
              <div className="recipe-card-quantity-container">
                <button
                  onClick={handleDecrease}
                  disabled={!cartRecipe?.quantity || cartRecipe.quantity <= 0}
                >
                  -
                </button>
                <span className="recipe-card-quantity-display">
                  {cartRecipe?.quantity || 0}
                </span>
                <button onClick={handleIncrease}>+</button>
              </div>
            ) : (
              <button
                className="recipe-card-btn-add-to-cart"
                onClick={handleAddToCart}
              >
                <i className="material-icons-round">shopping_cart</i> Add
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="related-recipes">
        <h3>Related Recipes</h3>
        <hr />
        <div className="related-recipes-list">
          {updatedRecipes.map((relatedRecipe) => (
            <div
              key={relatedRecipe.id}
              onClick={() => handleRelatedRecipeClick()}
            >
              <RecipeCard recipe={relatedRecipe} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
