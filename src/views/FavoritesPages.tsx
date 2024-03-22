import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"
import { useMemo } from "react"

const FavoritesPages = () => {

  const favorites = useAppStore((state) => state.favorites)
  const hasFavorites = useMemo(() => favorites.length, [favorites])

  return (
    <>
        <h1 className="text-5xl font-bold">favoritos</h1>
        {hasFavorites ? (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 my-10 gap-10">
            {favorites.map(drink => (
               <DrinkCard
                key={drink.idDrink}
                drink={drink}
  
               />
            ) )}
          </div>
        ) : (
          <p className="my-10 text-center text-3xl">Los favoritos se mostraran aquí</p>
        )}
    </>
    
  )
}

export default FavoritesPages