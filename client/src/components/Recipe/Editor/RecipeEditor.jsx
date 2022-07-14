import * as React from 'react'
import InstructionEditor from "./InstructionEditor"
import {useState} from "react"
import IngredientEditor from "./IngredientEditor"
import {Grid, Box} from "@mui/material"
import Navbar from "../../Navigation/Navbar"
import RecipeInformationEditor from "./RecipeInformationEditor"

const RecipeEditor = () => {
    const [files, setFiles] = useState([])
    const [recipeTitle, setRecipeTitle] = useState('')
    const [instructions, setInstructions] = useState([''])
    const [ingredients, setIngredients] = useState([{name: '', quantity: ''}])

    //TODO Change navbar into editor navbar
    return (
        <>
            <Navbar/>
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