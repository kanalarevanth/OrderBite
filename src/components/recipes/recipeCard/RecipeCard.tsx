import React, { useState } from "react";

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
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card recipe-card shadow-sm">
        <img src={recipe.image} className="card-img-top" alt={recipe.name} />
        <div className="card-body d-flex flex-column justify-content-between">
          <h6 className="card-title text-left">{recipe.name}</h6>
          <p className="card-text small">
            <strong>Cuisine:</strong> {recipe.cuisine} <br />
          </p>

          <div className="d-flex flex-column justify-content-center align-items-center mt-auto">
            <div className="quantity-container d-flex align-items-center">
              <button
                className="btn btn-outline-primary mx-2"
                onClick={handleDecrease}
                disabled={quantity === 0}
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                className="btn btn-outline-primary mx-2"
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
