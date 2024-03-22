import {StateCreator } from 'zustand';
import { Recipe } from '../types';

export type favoritesSliceType = {
    favorites: Recipe[]
}

export const createFavoritesSlice : StateCreator<favoritesSliceType> = () => ({
    favorites: []
})