import * as React from 'react'
import PropTypes from 'prop-types'
import {Box, TextField, Button} from "@mui/material"
import {useRecoilState} from "recoil"
import userDataAtom from "../../recoil/auth/UserDataAtom"
import {useState} from "react"
import Comments from "../../api/comments"

const CommentEditor = ({onPostComment}) => {
    const [commentText, setCommentText] = useState('')

    return (
        <Box>
            <TextField onChange={(e) => setCommentText(e.target.value)}></TextField>
            <Button variant='contained' onClick={() => onPostComment(commentText)}>Post Comment</Button>
        </Box>
    )
}

CommentEditor.propTypes = {
    onPostComment: PropTypes.func
}

export default CommentEditor