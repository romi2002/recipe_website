import * as React from 'react'
import { Card, CardContent, CardHeader } from '@mui/material'
import RecipeGrid from './RecipeGrid'

const RecommendedCard = ({ recommendedRecipes, nRecipes = 5 }) => {
  const recipes = { data: recommendedRecipes.slice(0, nRecipes) }
  console.log(recipes)

  return (
    <Card>
      <CardHeader title={'Recommended Recipes'}/>
      <CardContent>
        <RecipeGrid recipes={recipes}/>
      </CardContent>
    </Card>
  )
}

export default RecommendedCard
