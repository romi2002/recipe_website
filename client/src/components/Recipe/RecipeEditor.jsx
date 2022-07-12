import * as React from 'react'
import InstructionEditor from "./Instructions/InstructionEditor"
import {useState} from "react"

const RecipeEditor = () => {
    const [instructions, setInstructions] = useState([''])

    return (
        <div>
            <h1>Editor</h1>
            <InstructionEditor instructions={instructions}
                               setInstructions={setInstructions}/>
        </div>
    )
}

export default RecipeEditor