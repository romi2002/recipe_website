import * as React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import InstructionEditor from './InstructionEditor'
import IngredientEditor from './IngredientEditor'
import { Box, Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import Navbar from '../../Navigation/Navbar'
import RecipeInformationEditor from './RecipeInformationEditor'
import SaveIcon from '@mui/icons-material/Save'
import Recipe from '../../../api/recipe'
import { useRecoilState } from 'recoil'
import { userDataAtom } from '../../../recoil/auth/UserDataAtom'
import { useNavigate } from 'react-router-dom'
import UserAvatar from '../../User/UserAvatar'
import { usePageTracking } from '../../../utils/usePageTracking'

const RecipeEditorButtons = ({ onSave, onClose, canSave }) => {
  return (<Card>
    <CardHeader title={'Save recipe'}/>
    <CardContent>
      <Button onClick={onSave} disabled={!canSave}>Save <SaveIcon/></Button>
      {/* <Button onClick={onClose}><CloseIcon/></Button> */}
    </CardContent>
  </Card>)
}

RecipeEditorButtons.propTypes = {
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  canSave: PropTypes.bool
}

const RecipeEditor = () => {
  const [userData] = useRecoilState(userDataAtom)
  const [files, setFiles] = useState([])
  const [recipeTitle, setRecipeTitle] = useState('')
  const [instructions, setInstructions] = useState([''])
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }])
  const navigate = useNavigate()

  usePageTracking()

  const hasValidRecipe = files.length !== 0 &&
    recipeTitle !== '' &&
    instructions.every(instruction => instruction !== '') &&
    ingredients.every(({ quantity, ingredient }) => {
      return quantity !== '' && ingredient !== ''
    })

  const onRecipeSave = () => {
    // Map to values needed from backend
    const recipe = {
      title: recipeTitle,
      instructions: instructions.map((inst) => {
        return { text: inst }
      }),
      original_url: 'original_content',
      ingredients: ingredients.map((ing) => {
        return { text: `${ing.quantity} ${ing.name}` }
      }),
      token: userData.token
    }

    // TODO check if upload image is successful before getting filename
    Recipe.uploadImage(files[0], userData.token).then((req) => {
      recipe.associated_media = [{ id: 'user_images/' + req.data.filename }]
    }).then(() => Recipe.saveRecipe(recipe, userData.token).then(() => {
      navigate('/', { replace: true })
    }))
  }

  const onRecipeClose = () => {
    navigate('/', { replace: true })
  }

  // TODO Change navbar into editor navbar
  return (
    <>
      <Navbar rightSideButtonGroup={<UserAvatar/>}/>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 4 }}>
        <Grid container spacing={2} direction={'column'}>
          <Grid item>
            <RecipeInformationEditor
              files={files} setFiles={setFiles}
              setRecipeTitle={setRecipeTitle}/>
          </Grid>

          <Grid item>
            <IngredientEditor
              ingredients={ingredients}
              setIngredients={setIngredients}/>
          </Grid>

          <Grid item>
            <InstructionEditor instructions={instructions}
                               setInstructions={setInstructions}/>
          </Grid>
          <Grid item>

            <RecipeEditorButtons onSave={onRecipeSave}
                                 onClose={onRecipeClose}
                                 canSave={hasValidRecipe}/>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default RecipeEditor
