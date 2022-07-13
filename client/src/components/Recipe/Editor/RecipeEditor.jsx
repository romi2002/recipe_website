import * as React from 'react'
import InstructionEditor from "./InstructionEditor"
import {useState} from "react"
import IngredientEditor from "./IngredientEditor"
import {Grid, Box} from "@mui/material"
import Navbar from "../../Navigation/Navbar"

const gridStyle = {
    border: 'none',
    backgroundColor: 'red'
}

const RecipeEditor = () => {
    const [instructions, setInstructions] = useState([''])
    const [ingredients, setIngredients] = useState([{name: '', quantity: ''}])

    //TODO Change navbar into editor navbar
    return (
        <>
            <Navbar/>
            <Box sx={{display: 'flex', flexDirection: 'column', p: 4}}>
                <Grid container spacing={2} direction={'column'}>
                    <Grid item>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <img src="https://via.placeholder.com/300"/>
                        </Box>
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