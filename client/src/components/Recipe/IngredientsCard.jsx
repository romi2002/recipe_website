import * as React from 'react'
import {Box, Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material"

const IngredientDisplay = ({ingredient}) => {
    return (
        <Typography>
            {ingredient}
        </Typography>
    )
}

const IngredientsCard = () => {
    return (
        <Card sx={{minWidth: 200}}>
            <CardHeader title="Ingredient list"/>
            <CardContent>
                <IngredientDisplay ingredient={'test'}/>
                <IngredientDisplay ingredient={'test'}/>
                <IngredientDisplay ingredient={'test'}/>
                <IngredientDisplay ingredient={'test'}/>
                <IngredientDisplay ingredient={'test'}/>
            </CardContent>
        </Card>
    )
}

export default IngredientsCard