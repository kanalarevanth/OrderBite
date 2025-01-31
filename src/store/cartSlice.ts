import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "../types/type";
import { RootState } from "./store";

interface CartState {
  items: Recipe[];
}

const initialState: CartState = {
  items: [],
};

interface UpdateRecipeQuantityPayload {
  id: number;
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addRecipe(state, action: PayloadAction<Recipe>) {
      const existingRecipe = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingRecipe) {
        existingRecipe.quantity = action.payload.quantity ?? 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    updateRecipeQuantity(
      state,
      action: PayloadAction<UpdateRecipeQuantityPayload>
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

export const selectCartCount = (state: RootState): number => {
  return state.cart.items.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
};

export const { addRecipe, updateRecipeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
