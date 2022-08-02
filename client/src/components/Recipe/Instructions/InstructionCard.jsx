import * as React from 'react'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { useRecoilState } from 'recoil'
import { userDataAtom } from '../../../recoil/auth/UserDataAtom'

const InstructionStep = ({ instruction }) => {
  return (
    <Typography>
      {instruction}
    </Typography>
  )
}

InstructionStep.propTypes = {
  instruction: PropTypes.string
}

const InstructionCard = ({ instructions, onSendMessage }) => {
  const [userData] = useRecoilState(userDataAtom)

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
        {userData.isLoggedIn && <Button onClick={onSendMessage} variant="contained">Text me the insructions!</Button>}
      </CardContent>
    </Card>
  )
}

InstructionCard.propTypes = {
  instructions: PropTypes.array,
  onSendMessage: PropTypes.func
}

export default InstructionCard
