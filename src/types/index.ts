import {z} from 'zod'
import { 
    CategoriesAPIResponseSchema, 
    DrinkAPIResponse, 
    DrinksAPIResponse, 
    SearchFilterSchema,
    RecipeAPIResponseSchema 


} from '../utils/recipes-schema'

//Con esto obtengo el type de categorias y agregarlo al slice
export type Categories = z.infer<typeof CategoriesAPIResponseSchema> 
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Drinks = z.infer<typeof DrinksAPIResponse>
export type Drink = z.infer<typeof DrinkAPIResponse>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>