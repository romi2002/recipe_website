import * as React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { Reply } from '@mui/icons-material'

const CommentView = ({ comment }) => {
  return (<Card sx={{ display: 'flex', m: 2 }}>
    <img src="https://via.placeholder.com/150"/>
    <CardContent>
      <Box sx={{ display: 'column' }}>
        <Typography>
          {comment.text}
        </Typography>
        <Button variant="outlined"><Reply/></Button>
      </Box>
    </CardContent>
  </Card>)
}

CommentView.propType = {
  comment: PropTypes.object
}

const Comment = ({ comment, level = 0 }) => {
  return (<Box sx={{ display: 'flex' }}>
    {level !== 0 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50px' }}>
      <Divider orientation="vertical"/>
    </Box>}
    <Box>
      <CommentView comment={comment}/>
      {/* insert separator here */}
      {comment.children?.map((child) => <Comment comment={child} level={level + 1}/>)}
    </Box>
  </Box>)
}

Comment.propTypes = {
  comment: PropTypes.object, level: PropTypes.number
}

const CommentViewer = ({ comments }) => {
  if (comments == null) {
    return (<></>)
  }

  return (<Card>
    <CardHeader title={'Comments'}/>
    <CardContent>
      {comments.map((comment, index) => <Comment key={'comment-' + index} comment={comment}/>)}
    </CardContent>
  </Card>)
}

CommentViewer.propTypes = {
  comments: PropTypes.array
}

export default CommentViewer
