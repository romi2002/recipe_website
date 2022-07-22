import * as React from 'react'
import PropTypes from 'prop-types'
import CloseableModal from '../Utils/CloseableModal'
import CommentEditor from './CommentEditor'

const CommentEditorModal = ({
  handleClose,
  onPostComment
}) => {
  return (
    <CloseableModal title="Post a comment" handleClose={handleClose}>
      <CommentEditor onPostComment={onPostComment}/>
    </CloseableModal>
  )
}

CommentEditorModal.propTypes = {
  handleClose: PropTypes.func,
  onPostComment: PropTypes.func
}

export default CommentEditorModal
