import React from "react";
import { useDispatch } from "react-redux";
import { addRecipe, updateRecipeQuantity } from "../../../store/cartSlice";
import { Recipe } from "../../../types/recipe";
import "./RecipeCard.css";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(addRecipe({ ...recipe, quantity: (recipe.quantity || 0) + 1 }));
  };

  const handleDecrease = () => {
    if (recipe.quantity && recipe.quantity > 0) {
      dispatch(
        updateRecipeQuantity({
          id: recipe.id,
          quantity: recipe.quantity - 1,
        })
      );
    }
  };

  return (
    <div className="recipe-card-container">
      <div className="recipe-card shadow-sm">
        <img
          src={recipe.image}
          className="recipe-card-img-top"
          alt={recipe.name}
        />
        <div className="recipe-card-body">
          <h6 className="recipe-card-title">{recipe.name}</h6>
          <p className="recipe-card-text small">
            <strong>Cuisine:</strong> {recipe.cuisine}
          </p>
          <div className="recipe-card-bottom-content">
            <div className="recipe-card-quantity-container">
              <button
                className="btn btn-outline-primary d-flex"
                onClick={handleDecrease}
                disabled={!recipe?.quantity}
              >
                -
              </button>
              <span className="recipe-card-quantity-display">
                {recipe?.quantity || 0}
              </span>
              <button
                className="btn btn-outline-primary d-flex"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
