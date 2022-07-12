import * as React from 'react'
import RecipeCard from "./RecipeCard"
import Grid from "@mui/material/Grid"

export default function RecipeGrid({recipes}){
    return (
        <Grid container spacing={2} alignContent="stretch" >
            {recipes.data && recipes.data.map((recipe,index) => {
                return (
                    <Grid item key={"recipe-card-" + index} xs>
                        <RecipeCard recipe={recipe}/>
                    </Grid>
                    )
            })}
        </Grid>
    )
}