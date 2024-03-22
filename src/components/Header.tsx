//NavLink sirve mas que nada para resaltar la pagina en la que esta un usuario
//Link no sirve como el NavLink
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import {NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

const Header = () => {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: '',

    })
    const {pathname} = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname] )

    const fetchCategories = useAppStore((state)=> state.fetchCategories)
    const categories = useAppStore((state)=> state.categories)
    const searchRecipes = useAppStore((state)=> state.searchRecipes)
    const showNotification = useAppStore((state)=> state.showNotification)



    useEffect(() =>{
        fetchCategories()
    }, [])

    //Esto aplica a un select y a un input
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name] : e.target.value
        })
    }

    //validar el formulario 
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //validar
        if(Object.values(searchFilters).includes('')){
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        //Consultar las recetas
        searchRecipes(searchFilters)
    }

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-10">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>
                    <nav>
                        <NavLink 
                            to="/"
                            className={({isActive}) =>
                            isActive ? 'text-orange-500 uppercase  p-2 font-bold  m-2 ' : 'text-white uppercase p-2 font-bold m-2 '
                            }
                        >Inicio</NavLink>
                        <NavLink 
                            to="/favoritos"
                            className={({isActive}) =>
                            isActive ? 'text-orange-500 uppercase  p-2 font-bold  m-2 ' : 'text-white uppercase p-2 font-bold m-2 '
                            }
                        >Favoritos
                        </NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form
                        className="md:w-1/2 2xl:w-1/3 bg-orange-500 my-16 p-10 rounded-xl shadow-xl space-y-8"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label 
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg "
                            >Nombre o Ingrediente 
                            </label>
                            <input 
                                type="text" 
                                id="ingredient"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o Ingrediente.Ej: Vodka, Tequila, Cafe"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>

                        <div className="space-y-4">
                            <label 
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg "
                            >Categoria
                            </label>
                            <select 
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="">-- Seleccione --</option>
                                {categories.drinks.map(category => (
                                    <option 
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >{category.strCategory}
                                    </option>
                                ))}
                            </select>    
                        </div>

                        <input 
                            type="submit" 
                            value="Buscar Recetas"
                            className="cursor-pointer bg-white font-bold uppercase hover:bg-orange-300 w-full p-2 rounded-lg"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}

export default Header