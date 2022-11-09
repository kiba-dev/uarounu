import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  TextField,
  Typography,
  Button,
  Chip,
  Card,
  CardContent
} from '@mui/material'
import Header from 'components/Header'
import { getDiscussedTimes, getOtherTopics, getSpeakersList, getTopicResult } from 'redux/modules/topicDetail/actions'
import {
  topicDiscussedTimeSelector,
  otherTopicsSelector,
  speakersListSelector,
  topicResultSelector
} from 'redux/modules/topicDetail/selectors'

const TopicDetailsPage = () => {
  const history = useHistory()
  const { id } = useParams()
  const dispatch = useDispatch()
  const times = useSelector(topicDiscussedTimeSelector)
  const otherTopics = useSelector(otherTopicsSelector)
  const speakers = useSelector(speakersListSelector)
  const topicResult = useSelector(topicResultSelector)

  useEffect(() => {
    dispatchPageData()
  }, [dispatch])

  useEffect(() => {
    dispatchPageData()
  }, [id])

  const dispatchPageData = () => {
    dispatch(getDiscussedTimes())
    dispatch(getOtherTopics())
    dispatch(getSpeakersList())
    dispatch(getTopicResult())
  }

  const handleClickOtherTopic = (item) => {
    history.replace(`/${item.ngram.replace(/"/g, '')}`)
  }

  const handleClickSpeaker = (speaker) => () => {
    history.replace(`/speaker/${speaker.replace(/"|\[|\]/g, '')}`)
  }

  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Header value={id} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '100%', maxWidth: '200px' }}>
          <TextField size="small" />
          <Typography>First Time discussed</Typography>
          <TextField size="small" />
          <Typography>Last Time discussed</Typography>
          <Box>Ads</Box>
          <Typography>Speakers:</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {speakers && Object.keys(speakers).map((speaker, index) => (
              <Button
                key={index}
                variant='contained'
                sx={{ mb: 1 }}
                onClick={handleClickSpeaker(speaker)}
              >
                {speaker.replace(/\[|\]|"/g, '')}
              </Button>
            ))}
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, px: 5 }}>
          <Typography sx={{ mb: 2 }}>Results:</Typography>
          <Box>
            {topicResult && Object.values(topicResult).map((item, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {item.publishedat.replace(/"/g, '')}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Title: {item.channeltitle.replace(/"/g, '')}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Party:
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Link: {item.url.replace(/"/g, '')}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Duration: {item.duration.replace(/"/g, '')} mins
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        <Box sx={{ maxWidth: '200px', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography>Other Topics Discussed...</Typography>
          {otherTopics && Object.values(otherTopics).map((item, index) => (
            <Chip key={index} label={item.ngram.replace(/"/g, '')} sx={{ mb: 2 }} onClick={() => handleClickOtherTopic(item)} />
          ))}
          <Box>Ads</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TopicDetailsPage
