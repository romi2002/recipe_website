import * as React from 'react'
import PropTypes from 'prop-types'
import RecipeCard from './RecipeCard'
import { Box, Grid } from '@mui/material'

export default function RecipeGrid ({ recipes, allowFavorite, favoriteRecipes, onRecipeFavorite = () => {} }) {
  return (
    <Grid container spacing={2} alignContent="stretch">
      {recipes != null && recipes.map((recipe, index) => {
        return (
          <Grid item key={'recipe-card-' + index} xs>
            <Box sx={{ height: '100%' }}>
              <RecipeCard editable={false} recipe={recipe}
                          onFavorite={onRecipeFavorite}
                          allowFavorite={allowFavorite}
                          isFavorite={favoriteRecipes.includes(recipe._id.toString())}/>
            </Box>
          </Grid>
        )
      })}
    </Grid>
  )
}

RecipeGrid.propTypes = {
  recipes: PropTypes.object,
  allowFavorite: PropTypes.bool,
  favoriteRecipes: PropTypes.array,
  onRecipeFavorite: PropTypes.func
}
