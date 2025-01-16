import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "../types/recipe";

interface CartState {
  items: Recipe[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addRecipe(state, action: PayloadAction<Recipe>) {
      const existingRecipe = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingRecipe) {
        existingRecipe.quantity = action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateRecipeQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const recipe = state.items.find((item) => item.id === action.payload.id);
      if (recipe) {
        recipe.quantity = action.payload.quantity;
        if (recipe.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const selectCartCount = (state: { cart: CartState }) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

export const { addRecipe, updateRecipeQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
