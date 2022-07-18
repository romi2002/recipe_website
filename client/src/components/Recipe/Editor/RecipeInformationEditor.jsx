import * as React from 'react'
import { Card, Box, Button, TextField, Typography, CardHeader } from '@mui/material'
import { FileUploader } from 'evergreen-ui'
import { useState } from 'react'

const RecipeInformationImage = ({ url, onRemove }) => {
  return (
        <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
            <Box component="img"
                 sx={{ maxWidth: 300, borderRadius: 2, mb: 2 }}
                 variant={'outlined'} src={url}/>
            <Button variant="contained" onClick={onRemove}>Remove image</Button>
        </Box>
  )
}

const RecipeInformationEditor = ({
  files, setFiles,
  setRecipeTitle
}) => {
  const handleAccepted = (files) => {
    setFiles([files[0]])
  }

  const handleRemoveFiles = () => {
    setFiles([])
  }

  const handleTitleChange = (event) => {
    setRecipeTitle(event.target.value)
  }

  const hasFile = files.length !== 0

  return (
        <Card sx={{ p: 2 }}>
            <CardHeader title="Recipe Information Editor"/>
            <Box sx={{ display: 'flex', flexDirection: 'column', p: 1, alignItems: 'start', justifyContent: 'center' }}>
                <TextField sx={{ width: 300 }} label="Recipe Title" onChange={handleTitleChange}></TextField>
                {!hasFile && <FileUploader values={files}
                                           onAccepted={handleAccepted}
                                           maxFiles={1}
                                           maxSizeInBytes={10000000}
                                           acceptedMimeTypes={['image/jpeg', 'image/png']}/>}
                {hasFile && <RecipeInformationImage
                    url={URL.createObjectURL(files[0])}
                    onRemove={handleRemoveFiles}/>}
            </Box>
        </Card>
  )
}

export default RecipeInformationEditor
