import React from 'react'
import Navbar from "../Navigation/Navbar"
import {Box, Typography} from '@mui/material'
import RecipeCard from "./RecipeCard"
import IngredientsCard from "./Ingredients/IngredientsCard"
import { loremIpsum } from "lorem-ipsum"

const RecipeView = () => {

    const recipe = {'title': 'Test Recipe'}

    return (
        <Box>
            <Navbar/>
            <Box sx={{display: 'flex', pt: 2, pr: 2, pl: 2, flexGrow: 2, flexWrap: 'wrap'}}>
                <Box sx={{display: 'flex', flexDirection:'column', pr:2, flexGrow: 2}}>
                    <RecipeCard recipe={recipe}/>
                    <Box sx={{pt: 2}}>
                        <IngredientsCard/>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexBasis: 600}}>
                    <Typography>
                        {loremIpsum({count:10})}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default RecipeView