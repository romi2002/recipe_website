import * as React from 'react'
import { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Card, CardContent, CardHeader, Checkbox, Typography } from '@mui/material'
import { useRecoilState } from 'recoil'
import { userDataAtom } from '../../../recoil/auth/UserDataAtom'
import { useNavigate } from 'react-router-dom'

const IngredientDisplay = ({ ingredient, keyword, onChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Checkbox onChange={(event) => onChange(event, keyword)}/>
      <Typography>
        {ingredient}
      </Typography>
    </Box>
  )
}

IngredientDisplay.propTypes = {
  ingredient: PropTypes.string,
  keyword: PropTypes.object,
  onChange: PropTypes.func
}

const IngredientsCard = ({ ingredients, keywords, onSendMessage }) => {
  const [userData] = useRecoilState(userDataAtom)
  const navigate = useNavigate()
  const [selectedKeywords, setSelectedKeywords] = useState([])

  const onSearchClick = () => {
    navigate('/search/ingredient_search/' + JSON.stringify(selectedKeywords))
  }

  const onCheckboxClick = (event, keyword) => {
    if (event.target.checked) {
      setSelectedKeywords([...selectedKeywords, keyword])
    } else {
      setSelectedKeywords([...selectedKeywords].filter(k => k !== keyword))
    }
  }

  useEffect(() => console.log(selectedKeywords), [selectedKeywords])

  return (
    <Card sx={{ minWidth: 200 }}>
      <CardHeader title="Ingredient list"/>
      <CardContent>
        <Typography>
          Search for recipes with selected ingredients
        </Typography>
        <Button onClick={onSearchClick} disabled={selectedKeywords.length === 0}>
          Search!
        </Button>
        <ul>
          {ingredients.map((ingredient, index) => {
            return (
              <Fragment key={'ingredient-' + index}>
                <li>
                  <IngredientDisplay ingredient={ingredient.text} keyword={keywords[index]} onChange={onCheckboxClick}/>
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
  onSendMessage: PropTypes.func,
  keywords: PropTypes.array
}

export default IngredientsCard
