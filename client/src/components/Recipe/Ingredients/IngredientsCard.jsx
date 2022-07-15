import * as React from 'react'
import {Fragment} from 'react'
import {Box, Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material"

const IngredientDisplay = ({ingredient}) => {
    return (
        <Typography>
            {ingredient}
        </Typography>
    )
}

const IngredientsCard = ({ingredients}) => {
    return (
        <Card sx={{minWidth: 200}}>
            <CardHeader title="Ingredient list"/>
            <CardContent>
                <ul>
                    {ingredients.map((ingredient, index) => {
                        return (
                            <Fragment key={'ingredient-' + index}>
                                <IngredientDisplay ingredient={ingredient.text}/>
                            </Fragment>)
                    })}
                </ul>
            </CardContent>
        </Card>
    )
}

export default IngredientsCard