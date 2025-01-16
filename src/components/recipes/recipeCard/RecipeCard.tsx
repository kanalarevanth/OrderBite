import "./RecipeCard.css";
import { Recipe } from "../../../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  recipeIndex: number;
  handleIncrease: (id: number, recipeIndex: number) => void;
  handleDecrease: (id: number, recipeIndex: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  recipeIndex,
  handleIncrease,
  handleDecrease,
}) => {
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
                onClick={() => handleDecrease(recipe.id, recipeIndex)}
                disabled={!recipe?.quantity}
              >
                -
              </button>
              <span className="quantity-display">{recipe?.quantity || 0}</span>
              <button
                className="btn btn-outline-primary d-flex"
                onClick={() => handleIncrease(recipe.id, recipeIndex)}
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
