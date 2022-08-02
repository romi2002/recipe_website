import * as React from 'react'
import PropTypes from 'prop-types'
import { CardActionArea, Fab } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { recipeHistoryAtom } from '../../recoil/RecipeHistory'
import { SERVER_URL } from '../../utils/Constants'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { red } from '@mui/material/colors'
import { userDataAtom } from '../../recoil/auth/UserDataAtom'

const FavoriteButton = ({ recipeId, isFavorite, favoriteButtonSize, onClick }) => {
  return (
    <Fab onClick={() => onClick(recipeId)} size={favoriteButtonSize}
         sx={{ position: 'absolute', right: '0px', mr: 0.5, mt: 0.5 }}>
      {isFavorite && <Favorite sx={{ color: red[400] }}/>}
      {!isFavorite && <FavoriteBorder/>}
    </Fab>)
}

export default function RecipeCard ({
  recipe,
  imageHeight = '200px',
  editable,
  rating,
  onRate = () => {},
  isFavorite,
  onFavorite,
  allowFavorite = true,
  favoriteButtonSize = 'medium'
}) {
  const [userData] = useRecoilState(userDataAtom)

  const avatarInitial = recipe.avatar ?? 'R'

  const [recipeHistory, setRecipeHistory] = useRecoilState(recipeHistoryAtom)

  const CardContent = () => (
    <>
      {recipe.associated_media != null && <CardMedia
        component="img"
        sx={{ height: imageHeight }}
        image={SERVER_URL + '/' + recipe.associated_media[0].id}
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
            {avatarInitial}
          </Avatar>
        }/> {/* TODO Add user id to DB so Avatar can show user profile */}
    </>
  )

  const addSelfToHistory = () => {
    setRecipeHistory([...recipeHistory, recipe._id])
  }

  return (
    <Card sx={{ minWidth: 200, position: 'relative', maxWidth: 400 }}>
      {allowFavorite && userData.isLoggedIn &&
        <FavoriteButton recipeId={recipe._id} isFavorite={isFavorite} favoriteButtonSize={favoriteButtonSize}
                        onClick={onFavorite}/>}
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
  'recipe.recipeId': PropTypes.string,
  imageHeight: PropTypes.string,
  editable: PropTypes.bool,
  isFavorite: PropTypes.bool,
  favoriteButtonSize: PropTypes.string,
  onClick: PropTypes.func,
  rating: PropTypes.number,
  onRate: PropTypes.func,
  onFavorite: PropTypes.func,
  allowFavorite: PropTypes.bool
}
