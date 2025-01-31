import React from "react";
import { useDispatch } from "react-redux";
import { addRecipe, updateRecipeQuantity } from "../../../store/cartSlice";
import { Recipe } from "../../../types/type";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addRecipe({ ...recipe, quantity: (recipe.quantity || 0) + 1 }));
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (recipe.quantity && recipe.quantity > 0) {
      dispatch(
        updateRecipeQuantity({
          id: recipe.id,
          quantity: recipe.quantity - 1,
        })
      );
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addRecipe({ ...recipe, quantity: 1 }));
  };

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div className="recipe-card-container">
      <div className="recipe-card shadow-sm">
        <img
          src={recipe.image}
          className="recipe-card-img-top"
          alt={recipe.name}
          onClick={handleCardClick}
        />
        <div className="recipe-card-body">
          <h6 className="recipe-card-title" onClick={handleCardClick}>
            {recipe.name}
          </h6>
          <p className="recipe-card-text small">
            <strong>Cuisine:</strong> {recipe.cuisine}
          </p>
          <div className="recipe-card-bottom-content">
            {recipe.quantity ? (
              <div className="recipe-card-quantity-container">
                <button
                  onClick={handleDecrease}
                  disabled={recipe.quantity <= 0}
                >
                  -
                </button>
                <span className="recipe-card-quantity-display">
                  {recipe.quantity}
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
    </div>
  );
};

export default RecipeCard;
