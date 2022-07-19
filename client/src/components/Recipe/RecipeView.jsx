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
import Comments from '../../api/comments'
import CommentViewer from '../Comments/CommentViewer'

const RecipeView = () => {
  const [userData] = useRecoilState(userDataAtom)
  const [recipe, setRecipe] = useState(null)
  const [comments, setComments] = useState([])
  const { recipeId } = useParams()

  useEffect(() => {
    Recipe.loadRecipe(recipeId).then((ret) => setRecipe(ret.data.data))
  }, [])

  const onSendIngredientsMessage = () => {
    Recipe.sendIngredientsMessage(recipeId, userData.token).then(() => console.log('Sent ingredients'))
  }

  const loadComments = () => {
    Comments.getComments(recipeId).then((resp) => setComments(resp.data.tree))
  }

  const postComment = (commentText) => {
    const comment = {
      recipe_id: recipeId,
      token: userData.token,
      parent_id: recipeId,
      comment_text: commentText
    }

    if (userData.isLoggedIn) {
      Comments.postComment(comment).then(() => console.log('Comment posted')).then(loadComments)
    }
  }

  /*
  Load comments for recipe
   */
  useEffect(() => {
    loadComments()
  }, [])

  return (
    <Box>
      <Navbar/>
      {recipe != null && <Grid direction="column" spacing={2} p={2} pl={8} pr={8} container>
        <Grid item>
          <RecipeCard recipe={recipe} imageHeight={'500px'}/>
        </Grid>
        <Grid item>
          <IngredientsCard onSendMessage={onSendIngredientsMessage} ingredients={recipe.ingredients}/>
        </Grid>
        <Grid item>
          <InstructionCard instructions={recipe.instructions}/>
        </Grid>
        <Grid item>
          <CommentViewer comments={comments}/>
        </Grid>
      </Grid>}
      {recipe == null && <CircularProgress/>}
    </Box>
  )
}

export default RecipeView
