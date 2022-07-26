import * as React from 'react'
import PropTypes from 'prop-types'
import RecipeCard from './RecipeCard'
import { Box, Grid } from '@mui/material'

export default function RecipeGrid ({ recipes }) {
  return (
    <Grid container spacing={1} alignContent="center">
      {recipes.data && recipes.data.map((recipe, index) => {
        return (
          <Grid item key={'recipe-card-' + index} xs>
            <Box>
              <RecipeCard recipe={recipe}/>
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
