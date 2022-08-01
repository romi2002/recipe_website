import * as React from 'react'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import IngredientSearchBar from './IngredientSearchBar'
import Navbar from '../Navigation/Navbar'
import Search from '../../api/search'
import RecipeGrid from '../Recipe/RecipeGrid'
import { CircularProgress } from '@mui/material'

const IngredientSearchPage = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [ingredientOptions, setIngredientOptions] = useState([])
  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const onSearchBarChange = (event, value) => {
    event.preventDefault()
    setSelectedIngredients(value)
  }

  useEffect(() => {
    Search.getAvailableIngredients().then((res) => {
      setIngredientOptions(res.data.ingredients)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    if (selectedIngredients.length === 0) return
    setIsLoading(true)
    Search.ingredientSearch(selectedIngredients).then((res) => {
      setRecipes(res.data.filter((recipe) => recipe.matching_ingredients))
      setIsLoading(false)
    })
  }, [selectedIngredients])

  return (<Box>
    <Navbar/>
    <Box sx={{ m: 2 }}>
      <IngredientSearchBar ingredientOptions={ingredientOptions} onChange={onSearchBarChange}/>
      {isLoading && <CircularProgress/>}
      {!isLoading && <>
        <RecipeGrid recipes={recipes} allowFavorite={false} favoriteRecipes={[]}/>
      </>}
    </Box>

  </Box>)
}

export default IngredientSearchPage
