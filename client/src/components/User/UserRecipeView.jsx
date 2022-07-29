import * as React from 'react'
import { useEffect, useState } from 'react'
import Navbar from '../Navigation/Navbar'
import userDataAtom from '../../recoil/auth/UserDataAtom'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useRecoilState } from 'recoil'
import Recipe from '../../api/recipe'
import RecipeGrid from '../Recipe/RecipeGrid'

const NoRecipesError = () => {
  return (<Box sx={{ display: 'flex', flexDirection: 'column', mt: 4 }}>
    <Typography variant={'h3'}>
      You have not created any recipes!
    </Typography>
    <Typography variant={'h4'}>
      Try creating more recipes
    </Typography>
  </Box>)
}

const UserRecipeView = () => {
  const [recipes, setRecipes] = useState(null)
  const [userData] = useRecoilState(userDataAtom)

  useEffect(() => {
    Recipe.getUserRecipes(userData.token).catch((err) => {
      // TODO Handle error somehow
      console.log(err.response)
    }).then((recipes) => {
      setRecipes(recipes?.data)
    })
  }, [userData])

  return (<Box>
    <Navbar/>
    {recipes?.data != null && <RecipeGrid recipes={recipes}/>}
    {recipes == null && <CircularProgress/>}
    {recipes?.data.length === 0 && <NoRecipesError/>}
  </Box>)
}

export default UserRecipeView
