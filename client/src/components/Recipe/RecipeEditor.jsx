import * as React from 'react'
import InstructionEditor from "./Instructions/InstructionEditor"
import {useState} from "react"
import IngredientEditor from "./Ingredients/IngredientEditor"
import {Box} from "@mui/material"

const RecipeEditor = () => {
    const [instructions, setInstructions] = useState([''])
    const [ingredients, setIngredients] = useState([{name: '', quantity: ''}])

    return (
        <div>
            <Box sx={{display: 'flex', minWidth: "100%"}}>
                <Box sx={{overflowY: 'scroll', maxHeight: '100vh'}}>
                    <img src="https://via.placeholder.com/300"/>
                    <IngredientEditor
                        ingredients={ingredients}
                        setIngredients={setIngredients}/>
                </Box>
                <Box sx={{flexGrow: 1, overflowY: 'scroll', maxHeight: '100vh'}}>
                    <InstructionEditor instructions={instructions}
                                       setInstructions={setInstructions}/>
                </Box>
            </Box>

        </div>
    )
}

export default RecipeEditor