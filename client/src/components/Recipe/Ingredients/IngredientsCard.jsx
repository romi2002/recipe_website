import * as React from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material'

const IngredientDisplay = ({ ingredient }) => {
  return (
        <Typography>
            {ingredient}
        </Typography>
  )
}

IngredientDisplay.propTypes = {
  ingredient: PropTypes.string
}

const IngredientsCard = ({ ingredients, onSendMessage }) => {
  return (
        <Card sx={{ minWidth: 200 }}>
            <CardHeader title="Ingredient list"/>
            <CardContent>
                <ul>
                    {ingredients.map((ingredient, index) => {
                      return (
                            <Fragment key={'ingredient-' + index}>
                                <IngredientDisplay ingredient={ingredient.text}/>
                            </Fragment>)
                    })}
                </ul>
                <Button onClick={onSendMessage} variant="contained">Send Message</Button>
            </CardContent>
        </Card>
  )
}

IngredientsCard.propTypes = {
  ingredients: PropTypes.array,
  onSendMessage: PropTypes.func
}

export default IngredientsCard
