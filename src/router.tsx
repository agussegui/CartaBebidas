import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexPage from "./views/IndexPage"
import FavoritesPages from "./views/FavoritesPages"
import Layout from "./layouts/Layout"

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}>
                <Route path='/' element={<IndexPage/>} index  />
                <Route path='/favoritos' element={<FavoritesPages/>} />
            </Route>
        </Routes>
    
    </BrowserRouter>
  )
}

export default AppRouter