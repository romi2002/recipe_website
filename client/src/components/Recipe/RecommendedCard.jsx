import * as React from 'react'
import { Card, CardContent, CardHeader } from '@mui/material'
import RecipeGrid from './RecipeGrid'
import PropTypes from 'prop-types'

const RecommendedCard = ({ recommendedRecipes, nRecipes = 5 }) => {
  const recipes = { data: recommendedRecipes.slice(0, nRecipes) }

  return (
    <Card>
      <CardHeader title={'Recommended Recipes'}/>
      <CardContent>
        <RecipeGrid recipes={recipes.data} allowFavorite={false} favoriteRecipes={[]}/>
      </CardContent>
    </Card>
  )
}

RecommendedCard.propTypes = {
  recommendedRecipes: PropTypes.array,
  nRecipes: PropTypes.number
}

export default RecommendedCard
