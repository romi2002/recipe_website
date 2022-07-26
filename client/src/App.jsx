import * as React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navigation/Navbar'
import RecipeGrid from './components/Recipe/RecipeGrid'
import Recipe from './api/recipe'
import { Box, CircularProgress, Pagination } from '@mui/material'
import Hero from './components/Navigation/Hero'
import RecipeGridNavBar from './components/Recipe/RecipeGridNavBar'

function App () {
  const recipesPerPage = 20
  const [recipes, setRecipes] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [sortMethod, setSortMethod] = useState('rating-ascending')

  const updateRecipes = (page = 1, sortMethod) => {
    return Recipe.loadRecipes(recipesPerPage * page, recipesPerPage, sortMethod)
  }

  useEffect(() => {
    updateRecipes(currentPage, sortMethod).then((data) => setRecipes(data.data))
  }, [currentPage, sortMethod])

  useEffect(() => {
    Recipe.getPageCount(recipesPerPage).then((ret) => setPageCount(ret))
  }, [])

  const onPageChange = (event, value) => {
    setCurrentPage(value - 1)
  }

  return (<div className="App">
    <Navbar/>
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <Box sx={{
        p: 4,
        pl: 12,
        pr: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '2000px'
      }}>
        {currentPage === 0 && <Hero/>}
        {recipes.length === 0 && <CircularProgress/>}
        <RecipeGridNavBar sortMethod={sortMethod} setSortMethod={setSortMethod}/>
        <RecipeGrid recipes={recipes}/>
        {pageCount > 0 && <Pagination sx={{ mt: 2, mb: 2 }} count={pageCount} onChange={onPageChange}/>}
      </Box>
    </Box>
  </div>)
}

export default App
