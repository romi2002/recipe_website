import * as React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const Comment = ({ comment }) => {
  return (
    <Typography>
      {comment.text}
    </Typography>
  )
}

Comment.propTypes = {
  comment: PropTypes.object
}

const CommentViewer = ({ comments }) => {
  console.log(comments)

  if (comments == null) {
    return (<></>)
  }

  return (
    <>
      {comments.map((comment, index) =>
        <Comment key={'comment-' + index} comment={comment}/>)}
    </>
  )
}

CommentViewer.propTypes = {
  comments: PropTypes.array
}

export default CommentViewer
