import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateRecipeQuantity } from "../store/cartSlice";
import { Recipe } from "../types/recipe";
import "./Cart.css";
import { RootState } from "../store/store";

const Cart: React.FC = () => {
  const cartItems: Recipe[] = useSelector(
    (state: RootState) => state.cart.items
  );
  const dispatch = useDispatch();

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateRecipeQuantity({ id, quantity }));
  };

  return (
    <div className="cart-items-container">
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item: Recipe) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="quantity-container">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 0}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
