import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, updateRecipeQuantity } from "../store/cartSlice";
import { Recipe } from "../types/type";
import { RootState } from "../store/store";
import "./RecipeDetails.css";

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const dispatch = useDispatch();

  const cartRecipe = useSelector((state: RootState) =>
    state.cart.items.find((r) => r.id === Number(id))
  );

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://dummyjson.com/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);
    };

    fetchRecipe();
  }, [id]);

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
    <div className="recipe-details-box">
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

        <div className="action-container">
          {cartRecipe ? (
            <div className="quantity-container">
              <button
                className="quantity-btn"
                onClick={handleDecrease}
                disabled={!cartRecipe?.quantity || cartRecipe.quantity <= 0}
              >
                -
              </button>
              <span className="quantity">{cartRecipe?.quantity || 0}</span>
              <button className="quantity-btn" onClick={handleIncrease}>
                +
              </button>
            </div>
          ) : (
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add <i className="material-icons-round">shopping_cart</i>
            </button>
          )}
        </div>

        <div className="ratings-container">
          <span className="rating-text">Ratings:</span>
          {renderStars(recipe.rating)}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
