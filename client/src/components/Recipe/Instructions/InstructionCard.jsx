import * as React from 'react'
import { Box, Card, CardContent, Typography, CardHeader } from '@mui/material'
import { Fragment } from 'react'

const InstructionStep = ({ instruction }) => {
  return (
        <Typography>
            {instruction}
        </Typography>
  )
}

const InstructionCard = ({ instructions }) => {
  return (
        <Card>
            <CardHeader title={'Instructions'}/>
            <CardContent>
                <ol>
                    {instructions.map((instruction, index) => {
                      return (<Fragment key={'instruction-' + index}>
                            <li>
                                <InstructionStep instruction={instruction.text}/>
                            </li>
                        </Fragment>)
                    })}
                </ol>
            </CardContent>
        </Card>
  )
}

export default InstructionCard
