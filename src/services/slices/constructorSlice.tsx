import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export const postOrders = createAsyncThunk(
  'constructor/post',
  async (ingredients: string[]) => orderBurgerApi(ingredients)
);

interface TConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
  loading: boolean;
}

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: undefined,
  loading: false
};

export const constructorSlice = createSlice({
  name: 'orderConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const data = action.payload;
        if (data.type === 'bun') {
          state.constructorItems.bun = data;
        } else {
          state.constructorItems.ingredients.push(data);
        }
      },
      prepare: (data: TIngredient) => {
        const id = nanoid();
        return { payload: { ...data, id } };
      }
    },
    removeIngridient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    moveDownIngridient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      if (currentIndex < state.constructorItems.ingredients.length - 1) {
        state.constructorItems.ingredients[currentIndex] =
          state.constructorItems.ingredients[currentIndex + 1];
        state.constructorItems.ingredients[currentIndex + 1] = action.payload;
      }
    },
    moveUpIngridient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      if (currentIndex > 0) {
        state.constructorItems.ingredients[currentIndex] =
          state.constructorItems.ingredients[currentIndex - 1];
        state.constructorItems.ingredients[currentIndex - 1] = action.payload;
      }
    },
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderIngredients: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrders.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
        state.error = '';
      })
      .addCase(postOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
        state.orderRequest = false;
      });
  }
});

export const {
  addIngredient,
  removeIngridient,
  moveDownIngridient,
  moveUpIngridient,
  clearOrderModalData
} = constructorSlice.actions;

export const { getOrderIngredients } = constructorSlice.selectors;

export default constructorSlice.reducer;
