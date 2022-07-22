import * as React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, TextField } from '@mui/material'

const CommentEditor = ({ onPostComment }) => {
  const [commentText, setCommentText] = useState('')

  return (
    <Box>
      <TextField multiline sx={{ pb: 2 }} onChange={(e) => setCommentText(e.target.value)}></TextField>
      <Button variant="contained" onClick={() => onPostComment(commentText)}>Post Comment</Button>
    </Box>
  )
}

CommentEditor.propTypes = {
  onPostComment: PropTypes.func
}

export default CommentEditor
