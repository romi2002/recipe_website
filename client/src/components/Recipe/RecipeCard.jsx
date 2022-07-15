import * as React from 'react'
import {styled} from "@mui/material"
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import {CardActionArea} from "@mui/material"
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Recipe from "../../api/recipe"
import {Link} from "react-router-dom"

export default function RecipeCard({recipe}) {
    return (
        <Card sx={{minWidth: 200}}>
            <CardActionArea component={Link} to={"/recipes/" + recipe._id}>
                {recipe.associated_media != null && <CardMedia
                    component="img"
                    height="194"
                    image={"http://localhost:3000/" + recipe.associated_media[0].id}
                />}
                <CardHeader
                    title={recipe.title}
                    subheader={<Rating defaultValue={2} readOnly/>}
                    avatar={
                        <Avatar>
                            R
                        </Avatar>
                    }/> {/*TODO Add user id to DB so Avatar can show user profile*/}
                {/*<CardContent style={{paddingBottom:0, paddingTop:1}}>*/}
                {/*    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
                {/*        By: Abidasda*/}
                {/*    </Typography>*/}
                {/*</CardContent>*/}
            </CardActionArea>

        </Card>
    )
}