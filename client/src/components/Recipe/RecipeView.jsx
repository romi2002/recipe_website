import * as React from 'react'
import { useEffect, useState } from 'react'
import Navbar from '../Navigation/Navbar'
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Grid } from '@mui/material'
import RecipeCard from './RecipeCard'
import IngredientsCard from './Ingredients/IngredientsCard'
import { useLocation, useParams } from 'react-router-dom'
import Recipe from '../../api/recipe'
import InstructionCard from './Instructions/InstructionCard'
import { useRecoilState } from 'recoil'
import { userDataAtom } from '../../recoil/auth/UserDataAtom'
import Comments from '../../api/comments'
import CommentViewer from '../Comments/CommentViewer'
import CommentEditorModal from '../Comments/CommentEditorModal'

import Ratings from '../../api/ratings'
import Favorite from '../../api/favorite'
import Recommended from '../../api/recommended'
import { recipeHistoryAtom } from '../../recoil/RecipeHistory'
import { Helmet } from 'react-helmet-async'
import { SERVER_URL } from '../../utils/Constants'
import { Facebook } from '@mui/icons-material'
import ReactGA from 'react-ga'
import { usePageTracking } from '../../utils/usePageTracking'
import RecommendedCard from './RecommendedCard'

const RecipeView = () => {
  const [userData] = useRecoilState(userDataAtom)
  const [recipeHistory] = useRecoilState(recipeHistoryAtom)
  const [recipe, setRecipe] = useState(null)
  const [comments, setComments] = useState([])
  const [commentEditorOpen, setCommentEditorOpen] = useState(false)
  const [commentEditorOriginId, setCommentEditorOriginId] = useState(null)
  const [rating, setRating] = useState(null)
  const [recommendedRecipes, setRecommendedRecipes] = useState([])
  const { recipeId } = useParams()
  const location = useLocation()

  const [isFavorite, setIsFavorite] = useState(false)

  usePageTracking()

  useEffect(() => scrollTo(0, 0), [])

  useEffect(() => {
    Recipe.loadRecipe(recipeId).then((ret) => setRecipe(ret.data.data))
    Recommended.getRecommendedRecipes(recipeId).then((ret) => {
      // Filter out self and get actual recipes
      setRecommendedRecipes(ret.data.results.body.hits.hits.filter(
        (d) => d._id !== recipeId && !recipeHistory.includes(d._id)).map(d => {
        const recipe = d._source
        recipe._id = d._id
        return (recipe)
      }))
    })
  }, [recipeId])

  useEffect(() => {
    Ratings.getRatingForUser(recipeId, userData.token).then((doc) => setRating(doc.data.rating))
    Favorite.getFavoriteRecipeIds(userData.token).then((res) => {
      setIsFavorite(res.data.recipeIds.includes(recipeId))
    })
  }, [userData, recipeId])

  const onFavorite = () => {
    Favorite.favoriteRecipe(recipeId, !isFavorite, userData.token).then(() => {
      setIsFavorite(!isFavorite)
    })
  }

  const onSendIngredientsMessage = () => {
    Recipe.sendIngredientsMessage(recipeId, userData.token).then(() => console.log('Sent ingredients'))
  }

  const onSendInstructionMessage = () => {
    Recipe.sendInstructionsMessage(recipeId, userData.token).then(() => console.log('Sent ingredients'))
  }

  const loadComments = () => {
    Comments.getComments(recipeId).then((resp) => setComments(resp.data.tree))
  }

  const postComment = (commentText) => {
    const comment = {
      recipe_id: recipeId,
      token: userData.token,
      parent_id: commentEditorOriginId,
      comment_text: commentText
    }

    if (userData.isLoggedIn) {
      Comments.postComment(comment).then(() => console.log('Comment posted')).then(loadComments)
      setCommentEditorOpen(false)
    }
  }

  const onReplyClick = (commentId) => {
    setCommentEditorOriginId(commentId)
    setCommentEditorOpen(true)
  }

  /*
  Load comments for recipe
   */
  useEffect(() => {
    loadComments()
  }, [recipeId])

  return (
    <Box>
      <Helmet>
        {recipe && <meta property="og:title" content={recipe.title}/>}
        {recipe && <meta property="og:image" content={SERVER_URL + '/' + recipe.associated_media[0].id}/>}
        <meta property="fb:app_id" content={'454962819575199'}/>
      </Helmet>
      {commentEditorOpen &&
        <CommentEditorModal onPostComment={postComment} handleClose={() => setCommentEditorOpen(false)}/>}
      <Navbar/>
      {recipe != null && <Grid direction="column" spacing={2} p={2} pl={8} pr={8} container>
        <Grid item>
          <RecipeCard recipe={recipe} rating={rating} imageHeight={'500px'} editable={userData.isLoggedIn}
                      onRate={(e, value) => {
                        e.stopPropagation()
                        Ratings.rateRecipe(recipeId, value, userData.token).then(() => console.log('rated'))
                        setRating(value)
                      }}
                      isFavorite={isFavorite}
                      onFavorite={onFavorite}
          />
        </Grid>
        <Grid item>
          <Card>
            <CardHeader title={'Share Recipe'}/>
            <CardContent>
              <Button startIcon={<Facebook/>} variant="contained" onClick={() => {
                ReactGA.event({
                  category: 'User',
                  action: 'Shared recipe on facebook'
                })

                // eslint-disable-next-line no-undef
                FB.ui({
                  method: 'share',
                  href: 'https://recettear.debdev.xyz/' + location.pathname
                }, function (response) {})
              }}>Share on Facebook</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <IngredientsCard onSendMessage={onSendIngredientsMessage} ingredients={recipe.ingredients}
                           keywords={recipe.ingredient_keywords}/>
        </Grid>
        <Grid item>
          <InstructionCard onSendMessage={onSendInstructionMessage} instructions={recipe.instructions}/>
        </Grid>
        <Grid item>
          <CommentViewer recipeId={recipeId} onReplyClick={onReplyClick} comments={comments}/>
        </Grid>
        <Grid item>
          <RecommendedCard recommendedRecipes={recommendedRecipes}/>
        </Grid>
      </Grid>}
      {recipe == null && <CircularProgress/>}
    </Box>
  )
}

export default RecipeView
