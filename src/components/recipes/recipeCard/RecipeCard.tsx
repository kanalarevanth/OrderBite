import React, { useState } from "react";
import "./RecipeCard.css";

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

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="recipe-card-wrapper">
      <div className="recipe-card shadow-sm">
        <img src={recipe.image} className="card-img-top" alt={recipe.name} />
        <div className="card-body">
          <h6 className="card-title">{recipe.name}</h6>
          <p className="card-text small">
            <strong>Cuisine:</strong> {recipe.cuisine}
          </p>
          <div className="bottom-content">
            <div className="quantity-container">
              <button
                className="btn btn-outline-primary d-flex"
                onClick={handleDecrease}
                disabled={quantity === 0}
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
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
