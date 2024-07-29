import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
  getIngredientsApi()
);

interface TIngredientsState {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error?: string;
}

const initialState: TIngredientsState = {
  ingredients: [],
  loading: true,
  error: ''
};

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getAllIngredients: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.loading,
    getIngredientsError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getAllIngredients, getIngredientsLoading, getIngredientsError } =
  ingredientSlice.selectors;
export { initialState as ingredientsInitialState };
export default ingredientSlice.reducer;
