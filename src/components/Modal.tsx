import { Dialog, Transition } from '@headlessui/react';
import { Fragment,  } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default function Modal() {
  
    const modal = useAppStore((state) => state.modal)
    const closeModal = useAppStore((state) => state.closeModal)
    const selectedRecipe = useAppStore((state) => state.selectedRecipe)

    const renderIngredients = () => {

        const ingredients : JSX.Element[] = []
        for(let i = 1; i <= 6; i++){//Hago un for desde el primero hasta que sea menor o igual 6 y voy incrementando i
            const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]//lo que hace keyof
            const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]//
            // lo que hace keyof es que va a utilizar cualquiera de estas llaves que pertenezca a un type
            if(ingredient && measure) {//Push casi se usa en React porque muta el arreglo original pero este no es un state 
                ingredients.push(      //Esto es un arreglo que se llena de informacion con los ingredientes y cantidades 
                    <li
                        key={i}
                        className='text-lg font-normal list-none'
                    >
                        <FontAwesomeIcon icon={faCheck} /> {ingredient} - {measure}
                    </li>
                )
            }
        }

        return ingredients
    }
  
    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel 
                                    className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left    shadow-xl          transition-all   sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" 
                                >
                                    <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                        {selectedRecipe.strDrink}
                                    </Dialog.Title>
                                    <img 
                                            src={selectedRecipe.strDrinkThumb}
                                            alt={`Imagen de ${selectedRecipe.strDrink}`}
                                            className='mx-auto w-96'
                                    />
                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Ingrediente y Cantidades
                                    </Dialog.Title>
                                    {renderIngredients()}

                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Instrucciones
                                    </Dialog.Title>
                                    <p className='text-lg'>{selectedRecipe.strInstructions}</p>

                                    <div className='mt-5 flex justify-between gap-4'>
                                        <button
                                            type='button'
                                            className='w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-800 '
                                            onClick={closeModal}
                                        >
                                            Cerrar
                                        </button>

                                        <button
                                            type='button'
                                            className='w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-800 '
                                            onClick={() => handleClickFavorite()}
                                        >
                                            Agregar a Favoritos
                                        </button>
                                    </div>
                                </Dialog.Panel>
                          </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}