import * as React from 'react'
import './App.css'
import Navbar from './components/Navigation/Navbar'
import RecipeGrid from './components/Recipe/RecipeGrid'
import Recipe from './api/recipe'
import { useState, useEffect } from 'react'
import { Box, CircularProgress, Pagination } from '@mui/material'

function App () {
  const recipesPerPage = 20
  const [recipes, setRecipes] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const updateRecipes = (page = 1) => {
    return Recipe.loadRecipes(recipesPerPage * page, recipesPerPage)
  }

  useEffect(() => {
    updateRecipes(currentPage).then((data) => setRecipes(data.data))
  }, [currentPage])

  useEffect(() => {
    Recipe.getPageCount(recipesPerPage).then((ret) => setPageCount(ret))
  }, [])

  const onPageChange = (event, value) => {
    setCurrentPage(value - 1)
  }

  return (
            <div className="App">
                <Navbar/>
                <Box sx={{ m: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {recipes.length === 0 && <CircularProgress/>}
                    <RecipeGrid recipes={recipes}/>
                    {pageCount > 0 && <Pagination sx={{ mt: 2, mb: 2 }} count={pageCount} onChange={onPageChange}/>}
                </Box>
            </div>
  )
}

export default App
