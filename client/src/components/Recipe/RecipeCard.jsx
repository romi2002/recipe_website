import * as React from 'react'
import PropTypes from 'prop-types'
import { CardActionArea } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'

export default function RecipeCard ({ recipe, imageHeight = '200px', editable, rating, onRate = () => {} }) {
  const CardContent = () => (
    <>
      {recipe.associated_media != null && <CardMedia
        component="img"
        sx={{ height: imageHeight }}
        image={'http://localhost:3000/' + recipe.associated_media[0].id}
      />}
      <CardHeader
        title={recipe.title}
        subheader={
          <Rating defaultValue={recipe.average_rating} readOnly={!editable}
                  value={rating}
                  name={'recipe-rating'}
                  precision={0.5}
                  onChange={onRate}/>}
        avatar={
          <Avatar>
            R
          </Avatar>
        }/> {/* TODO Add user id to DB so Avatar can show user profile */}
    </>
  )

  return (
    <Card sx={{ minWidth: 200 }}>
      {!editable && <CardActionArea component={Link} to={'/recipes/' + recipe._id}>
        <CardContent/>
      </CardActionArea>}
      {editable && <CardContent/>}
      {/* <CardContent style={{paddingBottom:0, paddingTop:1}}> */}
      {/*    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> */}
      {/*        By: Abidasda */}
      {/*    </Typography> */}
      {/* </CardContent> */}
    </Card>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.object,
  imageHeight: PropTypes.string,
  editable: PropTypes.bool
}
