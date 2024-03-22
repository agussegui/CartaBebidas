import {StateCreator } from 'zustand';
import { Recipe } from '../types';
import { RecipesSliceType, createRecipesSlice } from './recipeSlice';
import { createNotificationSlice, notificationSliceType } from './notificaionSlice';

export type favoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite:(recipe: Recipe)=> void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void

}

export const createFavoritesSlice : StateCreator<favoritesSliceType & RecipesSliceType & notificationSliceType, [], [], favoritesSliceType > = (set, get, api) => ({
    favorites: [],
    handleClickFavorite:(recipe) => {
        if(get().favoriteExists(recipe.idDrink)){
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set,get,api).showNotification({
                text: 'Se elimino de Favoritos', 
                error: false
            })
        } else {
            set((state) =>({
                favorites: [...state.favorites, recipe] //Hay otra forma que se puede hacer
            }))
            createNotificationSlice(set,get,api).showNotification({
                text: 'Se agrego a Favoritos', 
                error: false
            })
        }
        createRecipesSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    //Revisar si existe el favorite en el state
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage:()=> {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})