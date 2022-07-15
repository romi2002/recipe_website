import * as React from 'react'
import {Box, TextField, Button} from "@mui/material"
import {useRecoilState} from "recoil"
import userDataAtom from "../../recoil/auth/UserDataAtom"
import {useState} from "react"
import Comments from "../../api/comments"

const CommentEditor = ({recipe_id}) => {
    const [commentText, setCommentText] = useState('')
    const [userData, _] = useRecoilState(userDataAtom)

    const postComment = () => {
        const comment = {
            recipe_id: recipe_id,
            token: userData.token,
            parent_id: '62d1e36f0c46866c0492d0a0',
            comment_text: commentText
        }
        console.log(userData)

        if(userData.isLoggedIn)
            Comments.postComment(comment).then(() => console.log("Comment posted"))
    }

    return (
        <Box>
            <TextField onChange={(e) => setCommentText(e.target.value)}></TextField>
            <Button variant='contained' onClick={postComment}>Post Comment</Button>
        </Box>
    )
}

export default CommentEditor