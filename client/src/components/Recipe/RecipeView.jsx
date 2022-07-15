import * as React from 'react'
import {useEffect, useState, Fragment} from 'react'
import Navbar from "../Navigation/Navbar"
import {Box, CircularProgress, Typography} from '@mui/material'
import RecipeCard from "./RecipeCard"
import IngredientsCard from "./Ingredients/IngredientsCard"
import {useParams} from "react-router-dom"
import Recipe from "../../api/recipe"
import InstructionCard from "./Instructions/InstructionCard"

const RecipeView = () => {
    const [recipe, setRecipe] = useState(null)
    const {recipeId} = useParams()

    useEffect(() => {
        Recipe.loadRecipe(recipeId).then((ret) => setRecipe(ret.data.data))
    }, [])

    return (
        <Box>
            <Navbar/>
            {recipe != null && <Box sx={{display: 'flex', m: 2, flexGrow: 2, flexWrap: 'wrap'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', mr: 2, flexGrow: 2}}>
                    <RecipeCard recipe={recipe}/>
                    <Box sx={{pt: 2}}>
                        <IngredientsCard ingredients={recipe.ingredients}/>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexBasis: 600}}>
                    <InstructionCard instructions={recipe.instructions}/>
                </Box>
            </Box>}
            {recipe == null && <CircularProgress/>}
        </Box>
    )
}

export default RecipeView