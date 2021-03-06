import * as React from 'react'
import { useEffect, useState } from 'react'
import Navbar from '../Navigation/Navbar'
import { userDataAtom } from '../../recoil/auth/UserDataAtom'
import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { useRecoilState } from 'recoil'
import Recipe from '../../api/recipe'
import RecipeGrid from '../Recipe/RecipeGrid'
import { usePageTracking } from '../../utils/usePageTracking'

const NoRecipesError = () => {
  return (<Paper sx={{ display: 'flex', flexDirection: 'column', mt: 4 }}>
    <Typography variant={'h3'}>
      You have not created any recipes!
    </Typography>
    <Typography variant={'h4'}>
      Try creating more recipes
    </Typography>
  </Paper>)
}

const UserRecipeView = () => {
  const [recipes, setRecipes] = useState(null)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [userData] = useRecoilState(userDataAtom)

  usePageTracking()

  useEffect(() => {
    Recipe.getUserRecipes(userData.token).catch((err) => {
      // TODO Handle error somehow
      console.log(err.response)
    }).then((recipes) => {
      setRecipes(recipes.data.data)
      setHasLoaded(true)
    })
  }, [userData])

  return (<Box>
    <Navbar/>
    {hasLoaded && <RecipeGrid recipes={recipes} favoriteRecipes={[]} allowFavorite={false}/>}
    {!hasLoaded && <CircularProgress/>}
    {hasLoaded && recipes.length === 0 && <NoRecipesError/>}
  </Box>)
}

export default UserRecipeView
