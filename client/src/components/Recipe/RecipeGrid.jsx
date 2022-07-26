import * as React from 'react'
import PropTypes from 'prop-types'
import RecipeCard from './RecipeCard'
import { Box, Grid } from '@mui/material'

export default function RecipeGrid ({ recipes }) {
  return (
    <Grid container spacing={2} alignContent="stretch">
      {recipes.data && recipes.data.map((recipe, index) => {
        return (
          <Grid item key={'recipe-card-' + index} xs>
            <Box sx={{ height: '100%' }}>
              <RecipeCard editable={false} recipe={recipe}/>
            </Box>
          </Grid>
        )
      })}
    </Grid>
  )
}

RecipeGrid.propTypes = {
  recipes: PropTypes.object
}
