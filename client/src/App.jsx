import * as React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navigation/Navbar'
import RecipeGrid from './components/Recipe/RecipeGrid'
import Recipe from './api/recipe'
import { Box, CircularProgress, Pagination } from '@mui/material'
import Hero from './components/Navigation/Hero'
import RecipeGridNavBar from './components/Recipe/RecipeGridNavBar'
import { useRecoilState } from 'recoil'
import sortSelectionAtom from './recoil/SortSelectionAtom'

function App () {
  const recipesPerPage = 20
  const [recipes, setRecipes] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [sortMethod, setSortMethod] = useRecoilState(sortSelectionAtom)

  const updateRecipes = (page = 1, sortMethod) => {
    return Recipe.loadRecipes(recipesPerPage * page, recipesPerPage, sortMethod)
  }

  useEffect(() => {
    console.log(currentPage)
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
      p: 4,
      pl: 12,
      pr: 12,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {currentPage === 0 && <Hero/>}
      {recipes.length === 0 && <CircularProgress/>}
      <RecipeGridNavBar sortMethod={sortMethod} setSortMethod={setSortMethod}/>
      <RecipeGrid recipes={recipes}/>
      {pageCount > 0 && <Pagination sx={{ mt: 2, mb: 2 }} count={pageCount} onChange={onPageChange}/>}
    </Box>
  </div>)
}

export default App
