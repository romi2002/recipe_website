import * as React from 'react'
import { useEffect, useState } from 'react'
import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import Navbar from '../Navigation/Navbar'
import RecipeGrid from '../Recipe/RecipeGrid'
import { useRecoilState } from 'recoil'
import userDataAtom from '../../recoil/auth/UserDataAtom'
import Favorite from '../../api/favorite'

const NoRecipesFavorited = () => {
  return (<Box sx={{ mt: 2 }}>
    <Typography variant={'h3'}>
      No recipes found!
    </Typography>
    <Typography variant={'h4'}>
      Try adding more recipes to your favorites!
    </Typography>
  </Box>)
}

const FavoriteRecipes = () => {
  const [userData] = useRecoilState(userDataAtom)
  const [recipes, setRecipes] = useState([])
  const [resultsLoaded, setResultsLoaded] = useState(false)

  useEffect(() => {
    Favorite.getFavoriteRecipes(userData.token).then((ret) => {
      setRecipes(ret.data.recipes)
      setResultsLoaded(true)
    })
  }, [userData])

  if (!userData.isLoggedIn) {
    return <Box>
      <Typography variant={'h1'}>
        Not logged in
      </Typography>
    </Box>
  }

  // TODO allow user to remove favorites from here
  return (<Box>
    <Navbar/>
    <Paper sx={{ m: 3, flexGrow: 1, display: 'flex', width: '100%' }}>
      <Typography variant={'h2'} sx={{ m: 2 }}>
        Your favorite recipes
      </Typography>
    </Paper>
    <Box sx={{ m: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {!resultsLoaded && <CircularProgress/>}
      {resultsLoaded && recipes.length !== 0 &&
        <RecipeGrid allowFavorite={false} recipes={recipes} favoriteRecipes={[]}/>}
      {resultsLoaded && recipes.length === 0 && <NoRecipesFavorited/>}
    </Box>
  </Box>)
}

export default FavoriteRecipes
