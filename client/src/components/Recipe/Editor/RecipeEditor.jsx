import * as React from 'react'
import InstructionEditor from "./InstructionEditor"
import {useState} from "react"
import IngredientEditor from "./IngredientEditor"
import {Grid, Box, Button, ButtonGroup} from "@mui/material"
import Navbar from "../../Navigation/Navbar"
import RecipeInformationEditor from "./RecipeInformationEditor"
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const RecipeEditorNavGroup = () => {
    return (<ButtonGroup variant="contained">
        <Button><SaveIcon/></Button>
        <Button><CloseIcon/></Button>
    </ButtonGroup>)
}

const RecipeEditor = () => {
    const [files, setFiles] = useState([])
    const [recipeTitle, setRecipeTitle] = useState('')
    const [instructions, setInstructions] = useState([''])
    const [ingredients, setIngredients] = useState([{name: '', quantity: ''}])

    //TODO Change navbar into editor navbar
    return (
        <>
            <Navbar rightSideButtonGroup={<RecipeEditorNavGroup/>}/>
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