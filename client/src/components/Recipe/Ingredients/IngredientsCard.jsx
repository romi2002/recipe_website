import * as React from 'react'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { useRecoilState } from 'recoil'
import userDataAtom from '../../../recoil/auth/UserDataAtom'

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
  const [userData] = useRecoilState(userDataAtom)

  return (
    <Card sx={{ minWidth: 200 }}>
      <CardHeader title="Ingredient list"/>
      <CardContent>
        <ul>
          {ingredients.map((ingredient, index) => {
            return (
              <Fragment key={'ingredient-' + index}>
                <li>
                  <IngredientDisplay ingredient={ingredient.text}/>
                </li>
              </Fragment>)
          })}
        </ul>
        {userData.isLoggedIn && <Button onClick={onSendMessage} variant="contained">Text me a checklist!</Button>}
      </CardContent>
    </Card>
  )
}

IngredientsCard.propTypes = {
  ingredients: PropTypes.array,
  onSendMessage: PropTypes.func
}

export default IngredientsCard
