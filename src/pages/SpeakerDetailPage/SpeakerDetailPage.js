import React, { useEffect } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import {
  Box,
  Typography,
  Card,
  CardContent
} from '@mui/material'
import Header from 'components/Header'
import { getSpeakerResult } from 'redux/modules/speakerDetail/actions'
import { speakerResultSelector } from 'redux/modules/speakerDetail/selectors'

const SpeakerDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const speakerResult = useSelector(speakerResultSelector)

  useEffect(() => {
    dispatch(getSpeakerResult())
  }, [dispatch])
  
  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Header value={id} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '100%', maxWidth: '200px' }}>
          <Box>Ads</Box>
        </Box>
        <Box sx={{ flexGrow: 1, pr: 5, pl: 5 }}>
          <Typography sx={{ mb: 2 }}>Results:</Typography>
          <Box>
            {speakerResult && Object.keys(speakerResult).map((item, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {id}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {item.replace(/"/g, '')}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        <Box sx={{ maxWidth: '200px', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box>Ads</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SpeakerDetailPage
