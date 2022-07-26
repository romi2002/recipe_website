import * as React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { Reply } from '@mui/icons-material'
import Avatar from '@mui/material/Avatar'
import { useRecoilState } from 'recoil'
import userDataAtom from '../../recoil/auth/UserDataAtom'

const CommentView = ({ comment, onReplyClick, isLoggedIn }) => {
  return (<Card sx={{ display: 'flex', m: 1, p: 1, pl: 2, alignItems: 'start', maxWidth: '600px' }}>
    <Avatar sx={{ mt: 3 }}>{(comment.poster_username ?? 'A')[0].toUpperCase()}</Avatar>
    <CardContent>
      <Box sx={{ display: 'column' }}>
        <Typography>
          {comment.text}
        </Typography>
        {isLoggedIn && <Button variant="outlined" onClick={() => onReplyClick(comment._id)}><Reply/></Button>}
      </Box>
    </CardContent>
  </Card>)
}

CommentView.propType = {
  comment: PropTypes.object, onReplyClick: PropTypes.func
}

const Comment = ({ comment, level = 0, onReplyClick, isLoggedIn }) => {
  return (<Box sx={{ display: 'flex' }}>
    {level !== 0 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50px' }}>
      <Divider orientation="vertical"/>
    </Box>}
    <Box>
      <CommentView onReplyClick={onReplyClick} comment={comment} isLoggedIn={isLoggedIn}/>
      {/* insert separator here */}
      {comment.children?.map((child) => <Comment key={child._id.toString()} onReplyClick={onReplyClick} comment={child}
                                                 level={level + 1}/>)}
    </Box>
  </Box>)
}

Comment.propTypes = {
  comment: PropTypes.object, level: PropTypes.number, onReplyClick: PropTypes.func
}

const CommentViewer = ({ recipeId, comments, onReplyClick }) => {
  const [userData] = useRecoilState(userDataAtom)

  return (<Card>
    <CardHeader title={'Comments'}/>
    <CardContent>
      {!userData.isLoggedIn && <Typography>Log in to post comments!</Typography>}
      {userData.isLoggedIn &&
        <Button sx={{ m: 1 }} variant="outlined" onClick={() => onReplyClick(recipeId)}>New Comment</Button>}
      {comments != null && comments.map((comment, index) => <Comment onReplyClick={onReplyClick}
                                                                     isLoggedIn={userData.isLoggedIn}
                                                                     key={'comment-' + index}
                                                                     comment={comment}/>)}
    </CardContent>
  </Card>)
}

CommentViewer.propTypes = {
  recipeId: PropTypes.string, comments: PropTypes.array, onReplyClick: PropTypes.func
}

export default CommentViewer
