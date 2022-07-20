import * as React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import Navbar from '../Navigation/Navbar'
import RecipeGrid from '../Recipe/RecipeGrid'
import Search from '../../api/search'

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
    {!resultsLoaded && <CircularProgress/>}
    {resultsLoaded && recipes.data.length !== 0 && <RecipeGrid recipes={recipes}/>}
    {resultsLoaded && recipes.data.length === 0 && <Typography>
      No recipes found!
    </Typography>}
  </Box>)
}

export default SearchResults
