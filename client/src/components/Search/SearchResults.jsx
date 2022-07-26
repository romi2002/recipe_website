import * as React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import Navbar from '../Navigation/Navbar'
import RecipeGrid from '../Recipe/RecipeGrid'
import Search from '../../api/search'

const NoRecipesFoundError = () => {
  return (<Box sx={{ mt: 2 }}>
    <Typography variant={'h3'}>
      No recipes found!
    </Typography>
    <Typography variant={'h4'}>
      Try searching for another recipe
    </Typography>
  </Box>)
}

const SearchResults = () => {
  const [recipes, setRecipes] = useState(null)
  const [resultsLoaded, setResultsLoaded] = useState(false)
  const { query } = useParams()

  useEffect(() => {
    Search.textSearch(query).then((res) => {
      setRecipes(res.data)
      setResultsLoaded(true)
    })
  }, [query])

  return (<Box>
    <Navbar/>
    <Box sx={{ m: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {!resultsLoaded && <CircularProgress/>}
      {resultsLoaded && recipes.data.length !== 0 && <RecipeGrid recipes={recipes}/>}
      {resultsLoaded && recipes.data.length === 0 && <NoRecipesFoundError/>}
    </Box>
  </Box>)
}

export default SearchResults
