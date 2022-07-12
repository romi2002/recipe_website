import * as React from 'react'
import InstructionEditor from "./Instructions/InstructionEditor"
import {useState} from "react"
import IngredientEditor from "./Ingredients/IngredientEditor"
import {Box} from "@mui/material"

const RecipeEditor = () => {
    const [instructions, setInstructions] = useState([''])
    const [ingredients, setIngredients] = useState([{name:'', quantity:''}])

    return (
        <div>
            <h1>Editor</h1>
            <Box sx={{display: 'flex'}}>
                <InstructionEditor instructions={instructions}
                                   setInstructions={setInstructions}/>
                <IngredientEditor ingredients={ingredients} setIngredients={setIngredients}/>
            </Box>

        </div>
    )
}

export default RecipeEditor