import * as React from 'react'
import { useEffect, useState } from 'react'
import Navbar from '../Navigation/Navbar'
import { Box, CircularProgress, Grid } from '@mui/material'
import RecipeCard from './RecipeCard'
import IngredientsCard from './Ingredients/IngredientsCard'
import { useParams } from 'react-router-dom'
import Recipe from '../../api/recipe'
import InstructionCard from './Instructions/InstructionCard'
import { useRecoilState } from 'recoil'
import userDataAtom from '../../recoil/auth/UserDataAtom'

import Ratings from '../../api/ratings'

const RecipeView = () => {
  const [userData] = useRecoilState(userDataAtom)
  const [recipe, setRecipe] = useState(null)
  const { recipeId } = useParams()

  // TODO Remove this
  Ratings.rateRecipe(recipeId, 1, userData.token).then(() => console.log('rated'))

  useEffect(() => {
    Recipe.loadRecipe(recipeId).then((ret) => setRecipe(ret.data.data))
  }, [])

  const onSendIngredientsMessage = () => {
    Recipe.sendIngredientsMessage(recipeId, userData.token).then(() => console.log('Sent ingredients'))
  }

  return (
    <Box>
      <Navbar/>
      {recipe != null && <Grid direction="column" spacing={2} p={2} pl={8} pr={8} container>
        <Grid item>
          <RecipeCard recipe={recipe} imageHeight={'500px'} editable={true}/>
        </Grid>
        <Grid item>
          <IngredientsCard onSendMessage={onSendIngredientsMessage} ingredients={recipe.ingredients}/>
        </Grid>
        <Grid item>
          <InstructionCard instructions={recipe.instructions}/>
        </Grid>
      </Grid>}
      {recipe == null && <CircularProgress/>}
    </Box>
  )
}

export default RecipeView
