import * as React from 'react'
import InstructionEditor from "./Instructions/InstructionEditor"
import {useState} from "react"
import IngredientEditor from "./Ingredients/IngredientEditor"

const RecipeEditor = () => {
    const [instructions, setInstructions] = useState([''])
    const [ingredients, setIngredients] = useState([{name:'', quantity:''}])

    return (
        <div>
            <h1>Editor</h1>
            <InstructionEditor instructions={instructions}
                               setInstructions={setInstructions}/>
            <IngredientEditor ingredients={ingredients} setIngredients={setIngredients}/>
        </div>
    )
}

export default RecipeEditor