import React, { useEffect } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import {
  Box,
  Typography,
  Card,
  Divider,
  Link,
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
    <Box sx={{ height: '100%' }}>
      <Card sx={{ mb: 2 }}>
        <Box>
          <Header value={id} />
        </Box>
      </Card>
      <Card sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 4, height: '100%' }}>
          <Box sx={{ width: '100%', maxWidth: '200px' }}>
            <Box>Ads</Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ flexGrow: 1, pr: 5, pl: 5 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Results:</Typography>
            <Box>
              {speakerResult && Object.values(speakerResult).map((item, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {item.publishedat ? item.publishedat.replace(/"/g, '') : ''}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Title: {item.channeltitle ? item.channeltitle.replace(/"/g, '') : ''}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Party:
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Link: <Link href={item.url ? item.url.replace(/"/g, '') : ''}> {item.url ? item.url.replace(/"/g, '') : ''} </Link>
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Duration: {item.duration ? item.duration.replace(/"/g, '') : ''} mins
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ maxWidth: '200px', width: '100%', display: 'flex', flexDirection: 'column', ml: 4 }}>
            <Box>Ads</Box>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default SpeakerDetailPage
