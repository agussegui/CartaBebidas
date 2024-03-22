import { create } from "zustand";
import { devtools  } from "zustand/middleware";
import { RecipesSliceType, createRecipesSlice } from "./recipeSlice";
import {favoritesSliceType, createFavoritesSlice} from './favoritesSlice'

//lo que hace es tomar una copia de todos los argumentos, todas las funciones de set, de get
export const useAppStore = create<RecipesSliceType & favoritesSliceType>()(devtools((...a) => ({
    
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a)

})))