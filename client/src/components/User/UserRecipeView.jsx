import * as React from 'react'
import { useEffect, useState } from 'react'
import Navbar from '../Navigation/Navbar'
import userDataAtom from '../../recoil/auth/UserDataAtom'
import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { useRecoilState } from 'recoil'
import Recipe from '../../api/recipe'
import RecipeGrid from '../Recipe/RecipeGrid'

const UserRecipeView = () => {
  const [recipes, setRecipes] = useState(null)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [userData] = useRecoilState(userDataAtom)

  useEffect(() => {
    Recipe.getUserRecipes(userData.token).catch((err) => {
      // TODO Handle error somehow
      console.log(err.response)
    }).then((recipes) => {
      console.log(recipes.data)
      setRecipes(recipes.data.data)
      setHasLoaded(true)
      console.log('updated recipes')
    })
  }, [userData])

  return (<Box>
    <Navbar/>
    <Paper sx={{ m: 3, flexGrow: 1, display: 'flex', width: '100%' }}>
      <Typography variant={'h2'} sx={{ m: 2 }}>
        Your Recipies
      </Typography>
    </Paper>
    <Box sx={{ m: 3 }}>
      {hasLoaded && <RecipeGrid recipes={recipes} favoriteRecipes={[]} allowFavorite={false}/>}
      {!hasLoaded && <CircularProgress/>}
    </Box>
  </Box>)
}

export default UserRecipeView
