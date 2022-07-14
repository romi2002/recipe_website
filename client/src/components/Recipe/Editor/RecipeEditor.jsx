import * as React from 'react'
import InstructionEditor from "./InstructionEditor"
import {useState} from "react"
import IngredientEditor from "./IngredientEditor"
import {Grid, Box, Button, ButtonGroup} from "@mui/material"
import Navbar from "../../Navigation/Navbar"
import RecipeInformationEditor from "./RecipeInformationEditor"
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import Recipe from "../../../api/recipe"
import {useRecoilState} from "recoil"
import userDataAtom from "../../../recoil/auth/UserDataAtom"

const RecipeEditorNavGroup = ({onSave, onClose, canSave}) => {
    return (<ButtonGroup variant="contained">
        <Button onClick={onSave} disabled={!canSave}><SaveIcon/></Button>
        <Button onClick={onClose}><CloseIcon/></Button>
    </ButtonGroup>)
}

const RecipeEditor = () => {
    const [userData, _] = useRecoilState(userDataAtom)
    const [files, setFiles] = useState([])
    const [recipeTitle, setRecipeTitle] = useState('')
    const [instructions, setInstructions] = useState([''])
    const [ingredients, setIngredients] = useState([{name: '', quantity: ''}])

    const hasValidRecipe = files.length !== 0 &&
        recipeTitle !== '' &&
        instructions.every(instruction => instruction !== '') &&
        ingredients.every(({quantity, ingredient}) => {
            return quantity !== '' && ingredient !== ''
        })

    const onRecipeSave = async () => {
        //Map to values needed from backend
        const recipe = {
            title: recipeTitle,
            instructions: instructions.map((inst) => {
                return {text: inst}
            }),
            original_url: "original_content",
            ingredients: ingredients.map((ing) => {
                return {text: `${ing.quantity} ${ing.name}`}
            }),
            files: files,
            token: userData.token
        }

        //TODO check if upload image is successful before getting filename
        await Recipe.uploadImage(files[0], userData.token).then((req) => recipe.files = req.data.filename)
        await Recipe.saveRecipe(recipe)
    }

    const onRecipeClose = () => {

    }

    //TODO Change navbar into editor navbar
    return (
        <>
            <Navbar rightSideButtonGroup={<RecipeEditorNavGroup
                onSave={onRecipeSave}
                onClose={onRecipeClose}
                canSave={hasValidRecipe}/>}/>
            <Box sx={{display: 'flex', flexDirection: 'column', p: 4}}>
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
                </Grid>
            </Box>
        </>
    )
}

export default RecipeEditor