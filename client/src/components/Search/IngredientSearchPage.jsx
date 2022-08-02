import * as React from 'react'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import IngredientSearchBar from './IngredientSearchBar'
import Navbar from '../Navigation/Navbar'
import Search from '../../api/search'
import RecipeGrid from '../Recipe/RecipeGrid'
import { CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'

const IngredientSearchPage = () => {
  let { query } = useParams()
  query = JSON.parse(query)

  const [selectedIngredients, setSelectedIngredients] = useState(query)
  const [ingredientOptions, setIngredientOptions] = useState([])
  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  console.log(query)

  const onSearchBarChange = (event, value) => {
    event.preventDefault()
    setSelectedIngredients(value)
  }

  useEffect(() => {
    Search.getAvailableIngredients().then((res) => {
      setIngredientOptions(res.data.ingredients)
    })
  }, [])

  useEffect(() => {
    if (selectedIngredients.length === 0) return
    setIsLoading(true)
    Search.ingredientSearchKeywords(selectedIngredients).then((res) => {
      setRecipes(res.data.filter((recipe) => recipe.matching_ingredients))
      setIsLoading(false)
    })
  }, [selectedIngredients])

  return (<Box>
    <Navbar/>
    <Box sx={{ m: 4 }}>
      <Box sx={{ m: 2 }}>
        <IngredientSearchBar ingredientOptions={ingredientOptions} onChange={onSearchBarChange} defaultValues={query}/>
      </Box>
      {isLoading && <CircularProgress/>}
      {!isLoading && <>
        <RecipeGrid recipes={recipes} allowFavorite={false} favoriteRecipes={[]}/>
      </>}
    </Box>

  </Box>)
}

export default IngredientSearchPage
